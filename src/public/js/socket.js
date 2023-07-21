console.log("hola front")

const socket = io()

socket.on("saludo", (data) => {
  console.log(`mensaje del servidor: ${data} `)
})

function alerta() {
  socket.emit(
    "saludoserver",
    "otro mensaje que estamos enviando desde el boton"
  )
}
