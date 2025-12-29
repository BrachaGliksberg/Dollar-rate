import { Router } from "express";
import { getExchangeRates } from "../controllers/exchangeRate.controller";


const router = Router();

router.get("/exchange-rates", getExchangeRates);

export default router;
