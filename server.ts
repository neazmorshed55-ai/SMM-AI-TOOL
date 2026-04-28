/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Content Generation Route
  app.post("/api/ai/generate", async (req, res) => {
    // This will be handled on frontend for now via Gemini SDK for simplicity 
    // unless user needs a secure backend proxy
    res.json({ message: "Use direct frontend SDK for Gemini as per Vite config." });
  });

  // Email API Route
  app.post("/api/email/send", async (req, res) => {
    const { to, subject, html, apiKey } = req.body;
    if (!apiKey) return res.status(400).json({ error: "Resend API Key is required." });
    
    try {
      const resend = new Resend(apiKey);
      const data = await resend.emails.send({
        from: 'OmniConnect <onboarding@resend.dev>',
        to,
        subject,
        html,
      });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
