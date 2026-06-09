import express from "express";
import path from "path";
import dotenv from "dotenv";
import sendRfqHandler from "./api/send-rfq";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request body parser
  app.use(express.json());

  // Enable CORS middleware for robust cross-origin requests
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Verbose Request Logger Middleware
  app.use((req, res, next) => {
    console.log(`[API Request Log] Method: ${req.method} | URL: ${req.url} | Origin: ${req.headers.origin || "Same Origin"}`);
    next();
  });

  // Bind the modular send-rfq API handler
  app.post("/api/send-rfq", sendRfqHandler);
  app.post("/send-rfq", sendRfqHandler);

  // Vite development middleware vs Static Production bundle
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode: loading Vite middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode: serving static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
