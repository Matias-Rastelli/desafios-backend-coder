const socket = io()

socket.on("connected", (data) => {
  console.log("connected with server")
})

socket.on("products", (data) => {
  const list = document.getElementById("productList")
  let products = ""

  data.forEach((product) => {
    products =
      products +
      `        <tr>
      <td> ${product.id} </td>
      <td> ${product.title} </td>
      <td> ${product.description} </td>
      <td> $ ${product.price} </td>
      <td> ${product.thumbnail} </td>
      <td> ${product.code} </td>
      <td> ${product.stock} </td>
      <td> ${product.status} </td>
      <td> ${product.category} </td>
    </tr>`
  })

  list.innerHTML = products
})

const addProductForm = document.getElementById("addProduct")
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(addProductForm)
  const newProduct = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    thumbnail: "sin imagen miniatura por el momento",
    code: formData.get("code"),
    stock: formData.get("stock"),
    category: formData.get("category"),
  }
  console.log(newProduct)
  socket.emit("addProduct", newProduct)
  addProductForm.reset()
})

const deleteProductForm = document.getElementById("deleteProduct")
deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(deleteProductForm)
  const productId = formData.get("productId")
  console.log(productId)
  socket.emit("deleteProduct", productId)
})
