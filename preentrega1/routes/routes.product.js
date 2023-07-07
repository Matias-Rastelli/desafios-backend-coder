import { Router } from "express"
import ProductManager from "../src/productManager.js"

const productManager = new ProductManager("products")
const productRouter = Router()

productRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query
    const products = await productManager.getProducts()
    res.send(limit ? products.slice(0, parseInt(limit)) : products)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

productRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params
    const product = await productManager.getProductByID(productId)
    product
      ? res.send(product)
      : res.status(404).send({ error: `Product not found` })
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

export default productRouter
