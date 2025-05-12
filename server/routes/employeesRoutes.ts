import { Router } from "express";
import { GetEmployees } from "../controllers/employeesController";

const router = Router();
router.get('/', GetEmployees);

export default router;
