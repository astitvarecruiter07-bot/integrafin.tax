const { createServer } = require("node:http");
const { parse } = require("node:url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number.parseInt(process.env.PORT || "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port number.");
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (request, response) => {
      try {
        const parsedUrl = parse(request.url || "/", true);
        await handle(request, response, parsedUrl);
      } catch (error) {
        console.error("Request handling failed:", error);
        response.statusCode = 500;
        response.end("Internal server error");
      }
    });

    server.once("error", (error) => {
      console.error("Server failed:", error);
      process.exit(1);
    });

    server.listen(port, hostname, () => {
      console.log(`IntegraFin is listening on http://${hostname}:${port}`);
    });

    const shutdown = () => {
      server.close(() => process.exit(0));
    };

    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  })
  .catch((error) => {
    console.error("Next.js initialization failed:", error);
    process.exit(1);
  });
