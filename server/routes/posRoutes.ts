import { Router } from "express";
import { GetProducts, LogSale } from "../controllers/posController";

const router = Router();
router.get('/', GetProducts);
router.post('/', LogSale);


export default router;