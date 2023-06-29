import fs from "fs/promises"

class ProductManager {
  constructor() {
    //crear el archivo
    this.path = `./products.json`
    this.products = []
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      const file = await fs.readFile(this.path, `utf-8`)
      const products = JSON.parse(file)

      const newProduct = {
        id: products.length == 0 ? 1 : products[products.length - 1].id + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      }

      const anyEmpty = Object.values(newProduct).some(
        (prop) => prop === undefined
      )
      if (anyEmpty) {
        return console.log("Todas los campos deben ser rellenados")
      }

      const isDuplicated = products.some((product) => product.code === code)
      if (isDuplicated) {
        return console.log("codigo duplicado")
      }

      this.products = products
      this.products.push(newProduct)
      await fs.writeFile(this.path, JSON.stringify(products))
    } catch (e) {
      console.log(e)
    }
  }

  getProducts = async () => {
    try {
      const file = await fs.readFile(this.path, `utf-8`)
      const products = JSON.parse(file)
      return products
    } catch (e) {
      console.log(e)
    }
  }

  getProductByID = async (id) => {
    const file = await fs.readFile(this.path, `utf-8`)
    const products = JSON.parse(file)

    const productFinded = products.find((product) => product.id === id)
    if (!productFinded) {
      return console.log("Not Found!")
    }
    return productFinded
  }

  updateProduct = async (id, updatedData) => {
    const file = await fs.readFile(this.path, `utf-8`)
    const products = JSON.parse(file)

    const IdProductToUpdate = products.findIndex((product) => product.id === id)
    if (IdProductToUpdate === -1) return console.log(`Product not found`)

    const updatedProduct = {
      ...products[IdProductToUpdate],
      ...updatedData,
      id: products[IdProductToUpdate].id,
    }

    if (updatedProduct.code !== products[IdProductToUpdate]) {
      const isDuplicated = products.some(
        (product) => product.code === updatedProduct.code
      )
      if (isDuplicated) {
        return console.log(`Campo "Code" duplicado`)
      }
    }
    products[IdProductToUpdate] = updatedProduct
    this.products = products
    await fs.writeFile(this.path, JSON.stringify(products))
    return console.log(updatedProduct)
  }

  deleteProduct = (id) => {
    //Eliminar un producto
  }
}
