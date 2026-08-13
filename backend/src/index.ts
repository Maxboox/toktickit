import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "TokTickIT API",
  });
});

app.get("/api/categories", (_req, res) => {
  // Catégories en dur (sans base de données)
  const categories = [
    { id: 1, name: "Account and Access" },
    { id: 2, name: "Hardware" },
    { id: 3, name: "Software" },
    { id: 4, name: "Network" }
  ];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`TokTickIT API running on http://localhost:${PORT}`);
});