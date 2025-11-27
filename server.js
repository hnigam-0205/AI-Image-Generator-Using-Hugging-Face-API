// server.js - single server for frontend + API

const express = require("express");
const path = require("path");

const app = express();

// Parse JSON bodies
app.use(express.json());

// Serve static frontend from "public" folder
const publicPath = path.join(__dirname, "public");
console.log("Serving static from:", publicPath);
app.use(express.static(publicPath));

// Your Hugging Face token
const HF_TOKEN = "hf_yoursecrettokenkey"; // <-- paste your HF token here

// API route to generate image
app.post("/api/generate", async (req, res) => {
  try {
    const { model, prompt, width, height } = req.body;

    console.log("POST /api/generate", { model, width, height });

    const hfResponse = await fetch(
      `https://router.huggingface.co/hf-inference/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width, height },
        }),
      }
    );

    if (!hfResponse.ok) {
      const error = await hfResponse.json().catch(() => ({}));
      console.error("HF error:", error);
      return res
        .status(hfResponse.status)
        .json({ error: error.error || "HF request failed" });
    }

    const arrayBuffer = await hfResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
