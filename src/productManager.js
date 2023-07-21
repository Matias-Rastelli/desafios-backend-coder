import fs from "fs/promises"
import { dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class ProductManager {
  constructor(path) {
    this.path = `${__dirname}/db/${path}.json`
    this.products = []
    if (this.#readFile()) {
      console.log("Constructor productos", "archivo ya creado")
    } else {
      this.#writeFile(this.products)
    }
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

  addProduct = async (product) => {
    const {
      title,
      description,
      price,
      thumbnail = "",
      code,
      stock,
      category,
      status = true,
    } = product
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
        category,
        status,
      }

      const anyEmpty = Object.values(newProduct).some(
        (prop) => prop === undefined
      )
      if (anyEmpty) {
        return { error: "Todas los campos deben ser rellenados" }
      }

      const isDuplicated = products.some((product) => product.code === code)
      if (isDuplicated) {
        return { error: "codigo duplicado" }
      }

      this.products = products
      this.products.push(newProduct)
      await this.#writeFile(products)
      return newProduct
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

      const productFinded = products.find((product) => product.id == id)
      if (!productFinded) {
        return console.log(`Product not found`)
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
        (product) => product.id == id
      )
      if (IdProductToUpdate === -1) return { error: `Product not found` }

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
          return { error: `Campo Code duplicado` }
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
        (product) => product.id == id
      )
      if (IdProductToDelete === -1) return { error: `Product not found` }

      const newProducts = products.filter((product) => product.id != id)

      this.products = newProducts
      await this.#writeFile(newProducts)
      return {
        productDeleted: {
          id: products[IdProductToDelete].id,
          title: products[IdProductToDelete].title,
        },
        deleted: true,
      }
    } catch (e) {
      console.log(e)
    }
  }
}
