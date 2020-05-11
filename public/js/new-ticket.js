
//DEFINIENDO LA VARIABLE OBSERVADORA
const socket = io()

//CONTROL CONEXION
socket.on('connect', function () {
    console.log('Hola bienvenido')
})

socket.on('disconnect', function() {
    console.log('Desconectado')
})

//ACCION DEL BOTON
document.getElementById("generarTicket").addEventListener("click", function(){
    socket.emit('nexTicket', null, function(anime){
        document.getElementById("lblNuevoTicket").innerHTML = anime
    })
})

//ESCUCHA PARA IMPRIMIR EN PANTALLA
socket.on('nowState', function(data) {
    document.getElementById("lblNuevoTicket").innerHTML = data.now
})

