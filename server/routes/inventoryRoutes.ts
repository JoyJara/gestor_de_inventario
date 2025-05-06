import { Router } from "express";
import { GetInventory, DeleteProduct, EditProduct, GetCategories, AddProduct } from "../controllers/inventoryController";

const router = Router();
router.get('/', GetInventory);
router.delete('/:id', DeleteProduct);
router.put('/:id', EditProduct);
router.get('/categories', GetCategories);
router.post('/', AddProduct);

export default router;