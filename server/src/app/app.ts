import cors from "cors";
import express from "express";
import exchangeRatesRoutes from "../routes/exchangeRate.route";


const app = express();

const clientPort = process.env.CLIENT_PORT;

if (!clientPort) {
  throw new Error("Missing required environment variable: CLIENT_PORT");
}

app.use(
  cors({
    origin: `http://localhost:${clientPort}`,
    methods: ["GET"],
  })
);

app.use(express.json());

app.use("/api", exchangeRatesRoutes);

export default app;
