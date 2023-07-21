import express from "express"
import productRouter from "../routes/routes.product.js"
import cartRouter from "../routes/routes.cart.js"
import handlebars from "express-handlebars"
import { Server as HTTPServer } from "http"
import { Server as SocketServer } from "socket.io"
import { dirname } from "path"
import { fileURLToPath } from "url"
import productViewRouter from "../routes/routes.viewProducts.js"
import ProductManager from "./productManager.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const productManager = new ProductManager("products")

const app = express()

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", productViewRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)

const httpServer = HTTPServer(app)
const io = new SocketServer(httpServer)
app.use((req, res, next) => {
  req.io = io
  next()
})

io.on("connection", async (socket) => {
  console.log(`cliente se ha conectado, ID: ${socket.id}`)
  socket.emit("products", await productManager.getProducts())

  socket.on("addProduct", async (newProdut) => {
    await productManager.addProduct(newProdut)
    socket.emit("products", await productManager.getProducts())
  })
  socket.on("deleteProduct", async (ID) => {
    await productManager.deleteProduct(ID)
    socket.emit("products", await productManager.getProducts())
  })
})

httpServer.listen(8080, () => console.log("connectados en puerto 8080"))
