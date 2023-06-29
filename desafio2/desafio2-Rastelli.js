import fs from "fs/promises"

class ProductManager {
  constructor() {
    this.path = `./products.json`
    this.products = []
    this.#writeFile(this.products)
  }

  #readFile = async () => {
    try {
      const file = await fs.readFile(this.path, `utf-8`)
      const products = JSON.parse(file)
      return products
    } catch (e) {
      console.log(e)
    }
  }
  #writeFile = async (array) => {
    try {
      await fs.writeFile(this.path, JSON.stringify(array))
    } catch (e) {
      console.log(e)
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      const products = await this.#readFile()

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
      await this.#writeFile(products)
    } catch (e) {
      console.log(e)
    }
  }

  getProducts = async () => {
    try {
      const products = await this.#readFile()
      return products
    } catch (e) {
      console.log(e)
    }
  }

  getProductByID = async (id) => {
    try {
      const products = await this.#readFile()

      const productFinded = products.find((product) => product.id === id)
      if (!productFinded) {
        return console.log("Not Found!")
      }
      return productFinded
    } catch (e) {
      console.log(e)
    }
  }

  updateProduct = async (id, updatedData) => {
    try {
      const products = await this.#readFile()

      const IdProductToUpdate = products.findIndex(
        (product) => product.id === id
      )
      if (IdProductToUpdate === -1) return console.log(`Product not found`)

      const updatedProduct = {
        ...products[IdProductToUpdate],
        ...updatedData,
        id: products[IdProductToUpdate].id,
      }

      if (updatedProduct.code !== products[IdProductToUpdate].code) {
        const isDuplicated = products.some(
          (product) => product.code === updatedProduct.code
        )
        if (isDuplicated) {
          return console.log(`Campo "Code" duplicado`)
        }
      }
      products[IdProductToUpdate] = updatedProduct
      this.products = products
      await this.#writeFile(products)
      return updatedProduct
    } catch (e) {
      console.log(e)
    }
  }

  deleteProduct = async (id) => {
    try {
      const products = await this.#readFile()

      const IdProductToDelete = products.findIndex(
        (product) => product.id === id
      )
      if (IdProductToDelete === -1) return console.log(`Product not found`)

      const newProducts = products.filter((product) => product.id != id)

      this.products = newProducts
      await this.#writeFile(newProducts)
    } catch (e) {
      console.log(e)
    }
  }
}
