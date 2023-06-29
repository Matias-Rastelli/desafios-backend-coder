class ProductManager {
  constructor() {
    this.products = []
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
      id: this.products.length + 1,
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

    const isDuplicated = this.products.some((product) => product.code === code)
    if (isDuplicated) {
      return console.log("codigo duplicado")
    }

    this.products.push(newProduct)
  }

  getProducts = () => {
    return this.products
  }

  getProductByID = (id) => {
    const productFinded = this.products.find((product) => product.id === id)
    if (!productFinded) {
      return console.log("Not Found!")
    }
    return productFinded
  }
}
