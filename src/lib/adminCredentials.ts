function constantTimeEqual(a: string, b: string) {
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;

  for (let i = 0; i < maxLen; i += 1) {
    const aCode = i < a.length ? a.charCodeAt(i) : 0;
    const bCode = i < b.length ? b.charCodeAt(i) : 0;
    diff |= aCode ^ bCode;
  }

  return diff === 0;
}

export function getAdminAuthConfig() {
  return {
    user: process.env.ADMIN_BASIC_USER,
    pass: process.env.ADMIN_BASIC_PASS,
    sessionSecret: process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_TOKEN,
  };
}

export function isAdminAuthConfigValid() {
  const { user, pass, sessionSecret } = getAdminAuthConfig();
  return Boolean(
    user &&
    user.length <= 120 &&
    pass &&
    pass.length >= 12 &&
    sessionSecret &&
    sessionSecret.length >= 32
  );
}

export function verifyAdminCredentialPair(incomingUser: string, incomingPass: string) {
  const { user, pass } = getAdminAuthConfig();

  if (!isAdminAuthConfigValid() || !user || !pass) {
    return null;
  }

  if (!constantTimeEqual(incomingUser, user) || !constantTimeEqual(incomingPass, pass)) {
    return null;
  }

  return incomingUser;
}

export function verifyAdminBasicCredentials(authHeader: string | null | undefined) {
  const { user, pass } = getAdminAuthConfig();

  if (!isAdminAuthConfigValid() || !user || !pass || !authHeader?.startsWith('Basic ')) {
    return null;
  }

  const encoded = authHeader.split(' ')[1];
  let decoded = '';

  try {
    decoded = atob(encoded);
  } catch {
    return null;
  }

  const separatorIndex = decoded.indexOf(':');
  const incomingUser = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : decoded;
  const incomingPass = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : '';

  return verifyAdminCredentialPair(incomingUser, incomingPass);
}
