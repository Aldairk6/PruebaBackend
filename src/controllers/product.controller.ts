import logger from "../../lib/logger";
import MongoConn from "../../lib/mongodb";
import IProducto from "../interfaces/product.interface";
import IResponse from "../interfaces/response.interface";
import productModel from "../models/product.model";

export default class ProductController{
    private mongoConn: MongoConn;
    constructor(){
        this.mongoConn = new MongoConn();
    }
    async saveProduct(product:IProducto):Promise<IResponse>{
        try {
            if(!product){
                return ({ok:false,message:"Datos incorrecto", response: null, code: 400})
            }
            await this.mongoConn.connectDB();
            const productSave = await productModel.create(product);
            return ({ok:true,message:"Producto Guardado", response: productSave, code: 200})
        } catch (error) {
            logger.error("[ProductController/saveProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
    async getProductByCategory(category:string):Promise<IResponse>{
        try {

            await this.mongoConn.connectDB();
            const product = await productModel.find({category})
            if(product.length < 1){
                return ({ok:false,message:"No hay producto", response: null, code: 404})
            }
            return ({ok:true,message:"Producto encontrado", response: product, code: 200})
        } catch (error) {
            logger.error("[ProductController/saveProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
}