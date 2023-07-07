import fs from "fs/promises"

export default class cartManager {
  constructor(path) {
    this.path = `./db/${path}.json`
    this.carts = []
    if (this.#readFile()) {
      console.log("Constructor carts", "archivo ya creado")
    } else {
      this.#writeFile(this.carts)
    }
  }

  #readFile = async () => {
    try {
      const file = await fs.readFile(this.path, `utf-8`)
      const carts = JSON.parse(file)
      return carts
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

  addCart = async (arrayProducts) => {
    try {
      const carts = await this.#readFile()

      const newCart = {
        id: carts.length == 0 ? 1 : carts[carts.length - 1].id + 1,
        products: arrayProducts,
      }
      this.carts = carts
      this.carts.push(newCart)
      await this.#writeFile(carts)
    } catch (e) {
      console.log(e)
    }
  }

  getCarts = async () => {
    try {
      const carts = await this.#readFile()
      return carts
    } catch (e) {
      console.log(e)
    }
  }

  getCartByID = async (id) => {
    try {
      const carts = await this.#readFile()

      const cartFinded = carts.find((cart) => cart.id == id)
      if (!cartFinded) {
        return console.log(`Cart not found`)
      }
      return cartFinded
    } catch (e) {
      console.log(e)
    }
  }

  addProductsToCart = async (cartID, productID) => {
    try {
      const carts = await this.#readFile()
      const cartFinded = this.getCartByID(cartID)

      this.carts = carts
      await this.#writeFile(carts)
    } catch (e) {
      console.log(e)
    }
  }
  // La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado,
  //agregándose como un objeto bajo el siguiente formato:
  //product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
  //quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
}
