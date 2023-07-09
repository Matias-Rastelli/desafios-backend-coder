import express from "express"
import productRouter from "../routes/routes.product.js"
import cartRouter from "../routes/routes.cart.js"

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)

app.get("/", async (req, res) => {
  try {
    res.send(`<h1>Puerto funcionando</h1>`)
  } catch (e) {
    res.status(502).send({ error: true })
  }
})

app.listen(8080, () => {
  console.log("Escuchando puerto 8080!")
})
