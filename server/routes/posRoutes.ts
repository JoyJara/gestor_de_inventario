import { Router } from "express";
import { GetProducts, LogSale, LogReturn } from "../controllers/posController";

const router = Router();
router.get('/', GetProducts);
router.post('/', LogSale);
router.post('/return/', LogReturn);


export default router;