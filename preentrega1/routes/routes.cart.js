import { Router } from "express"
import CartManager from "../src/cartManager.js"

const cartManager = new CartManager("carts")
const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query
    const carts = await cartManager.getCarts()
    res.send(limit ? carts.slice(0, parseInt(limit)) : carts)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

cartRouter.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params
    const cart = await cartManager.getCartByID(cartId)
    cart
      ? res.send(cart.products)
      : res.status(404).send({ error: `Cart not found` })
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

cartRouter.post("/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params
    const cart = await cartManager.addProductToCart(cartId, productId)
    res.send(cart)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

export default cartRouter
