import { Request, Response, Router } from "express";
import ProductController from "../controllers/product.controller";

const productController = new ProductController();
const routes = Router();

routes.post("/create" , async (req:Request, res:Response) => {
    try {
        const product = req.body;
        const response = await productController.saveProduct(product)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

routes.get("/:category",async (req:Request, res:Response) => {
    try {
        const category = req.params.category;
        const response = await productController.getProductByCategory(category)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})


export default routes