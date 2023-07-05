import express from "express"
import ProductManager from "./productManager.js"

const productManager = new ProductManager("products")

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
  try {
    res.send(`<h1>Puerto funcionando</h1>`)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query
    const products = await productManager.getProducts()
    res.send(limit ? products.slice(0, parseInt(limit)) : products)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

app.get("/products/:productId", async (req, res) => {
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

app.listen(8080, () => {
  console.log("Escuchando puerto 8080!")
})
