param(
  [Parameter(Mandatory = $true)]
  [string]$OutputArchive
)

$ErrorActionPreference = "Stop"
$workspacePath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$archivePath = [System.IO.Path]::GetFullPath($OutputArchive)

function Stop-ProcessTree {
  param([int]$RootProcessId)

  $childProcessIds = Get-CimInstance Win32_Process -Filter "ParentProcessId = $RootProcessId" `
    -ErrorAction SilentlyContinue | Select-Object -ExpandProperty ProcessId

  foreach ($childProcessId in $childProcessIds) {
    Stop-ProcessTree -RootProcessId $childProcessId
  }

  Stop-Process -Id $RootProcessId -Force -ErrorAction SilentlyContinue
}

if (Test-Path -LiteralPath $archivePath) {
  throw "Refusing to overwrite existing archive: $archivePath"
}

$stageRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("integrafin-godaddy-" + [guid]::NewGuid().ToString("N"))
$sourceRoot = Join-Path $stageRoot "integrafin-web"
$verifyRoot = Join-Path $stageRoot "verify"
New-Item -ItemType Directory -Path $sourceRoot -Force | Out-Null

$sourceFiles = @(
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
  "proxy.ts"
)

foreach ($sourceFile in $sourceFiles) {
  Copy-Item -LiteralPath (Join-Path $workspacePath $sourceFile) -Destination $sourceRoot
}

$sourceScripts = Join-Path $sourceRoot "scripts"
New-Item -ItemType Directory -Path $sourceScripts -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $workspacePath "scripts\clean-next-build.mjs") -Destination $sourceScripts
Copy-Item -LiteralPath (Join-Path $workspacePath "scripts\godaddy-preview.mjs") -Destination $sourceScripts

Copy-Item -LiteralPath (Join-Path $workspacePath "src") -Destination $sourceRoot -Recurse
Copy-Item -LiteralPath (Join-Path $workspacePath "public") -Destination $sourceRoot -Recurse

Compress-Archive -Path (Join-Path $sourceRoot "*") -DestinationPath $archivePath -CompressionLevel Optimal
Copy-Item -LiteralPath $sourceRoot -Destination $verifyRoot -Recurse

$serverProcess = $null
Push-Location $verifyRoot

try {
  if (Get-NetTCPConnection -State Listen -LocalPort 4187 -ErrorAction SilentlyContinue) {
    throw "Verification port 4187 is already in use."
  }

  & npm.cmd ci --omit=dev
  if ($LASTEXITCODE -ne 0) {
    throw "Production npm install failed with exit code $LASTEXITCODE"
  }

  & npm.cmd run build
  if ($LASTEXITCODE -ne 0) {
    throw "Production build failed with exit code $LASTEXITCODE"
  }

  $serverOut = Join-Path $stageRoot "server.out.log"
  $serverErr = Join-Path $stageRoot "server.err.log"
  $env:NODE_ENV = "preview"
  $env:PORT = "4187"
  $serverProcess = Start-Process `
    -FilePath "npm.cmd" `
    -ArgumentList @("run", "dev") `
    -WorkingDirectory $verifyRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput $serverOut `
    -RedirectStandardError $serverErr `
    -PassThru

  $ready = $false
  for ($attempt = 0; $attempt -lt 120; $attempt++) {
    Start-Sleep -Seconds 1

    try {
      $homeResponse = Invoke-WebRequest -Uri "http://127.0.0.1:4187/" -UseBasicParsing -TimeoutSec 5
      if ($homeResponse.StatusCode -eq 200) {
        $ready = $true
        break
      }
    } catch {
      if ($serverProcess.HasExited) {
        break
      }
    }
  }

  if (-not $ready) {
    Write-Output "SERVER STDOUT"
    if (Test-Path -LiteralPath $serverOut) {
      Get-Content -LiteralPath $serverOut
    }

    Write-Output "SERVER STDERR"
    if (Test-Path -LiteralPath $serverErr) {
      Get-Content -LiteralPath $serverErr
    }

    throw "Production server did not become ready."
  }

  $checks = @(
    @{ Name = "home"; Uri = "http://127.0.0.1:4187/" },
    @{ Name = "contact"; Uri = "http://127.0.0.1:4187/contact" },
    @{ Name = "blog"; Uri = "http://127.0.0.1:4187/blog" },
    @{ Name = "admin-login"; Uri = "http://127.0.0.1:4187/admin/login" },
    @{ Name = "robots"; Uri = "http://127.0.0.1:4187/robots.txt" },
    @{ Name = "sitemap"; Uri = "http://127.0.0.1:4187/sitemap.xml" }
  )

  foreach ($check in $checks) {
    $response = Invoke-WebRequest -Uri $check.Uri -UseBasicParsing -TimeoutSec 15
    Write-Output ("ROUTE {0}: HTTP {1}" -f $check.Name, $response.StatusCode)
  }

  Write-Output "PRODUCTION DEPENDENCY AUDIT"
  & npm.cmd audit --omit=dev
  if ($LASTEXITCODE -ne 0) {
    throw "Production dependency audit failed with exit code $LASTEXITCODE"
  }

  $archiveInfo = Get-Item -LiteralPath $archivePath
  Write-Output ("ARCHIVE: {0}" -f $archiveInfo.FullName)
  Write-Output ("ARCHIVE_MB: {0}" -f [math]::Round($archiveInfo.Length / 1MB, 2))
  Write-Output ("STAGING_DIRECTORY: {0}" -f $stageRoot)
} finally {
  if ($null -ne $serverProcess) {
    Stop-ProcessTree -RootProcessId $serverProcess.Id
  }

  Pop-Location
}
