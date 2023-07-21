import { Router } from "express"
import ProductManager from "../src/productManager.js"

const productManager = new ProductManager("products")
const productViewRouter = Router()

productViewRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render("home", { products })
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

productViewRouter.get("/realtimeproduct", async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render("realTimeProduct", { products })
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

export default productViewRouter
