import { Router } from "express";
import { GetProducts } from "../controllers/posController";

const router = Router();
router.get('/', GetProducts);

export default router;