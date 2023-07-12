import { Router } from "express"
import ProductManager from "../src/productManager.js"
import { upload } from "../config/multer.js"

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

productRouter.post("/", async (req, res) => {
  const bodyReq = req.body
  try {
    const newProduct = await productManager.addProduct(bodyReq)
    res.send(newProduct)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

productRouter.put("/:productID", async (req, res) => {
  const bodyReq = req.body
  const { productID } = req.params
  try {
    const updatedProduct = await productManager.updateProduct(
      productID,
      bodyReq
    )
    res.send(updatedProduct)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

productRouter.delete("/:productID", async (req, res) => {
  const { productID } = req.params
  try {
    const deletedProduct = await productManager.deleteProduct(productID)
    res.send(deletedProduct)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

export default productRouter
