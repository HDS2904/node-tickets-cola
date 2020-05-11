
//DEFINIENDO LA VARIABLE OBSERVADORA
const socket = io()

//CONTROL CONEXION
socket.on('connect', function () {
    console.log('Hola bienvenido')
})

socket.on('disconnect', function() {
    console.log('Desconectado')
})


const lblTicket1 = document.getElementById("lblTicket1")
const lblTicket2 = document.getElementById("lblTicket2")
const lblTicket3 = document.getElementById("lblTicket3")
const lblTicket4 = document.getElementById("lblTicket4")

const lblEscritorio1 =document.getElementById("lblEscritorio1")
const lblEscritorio2 =document.getElementById("lblEscritorio2")
const lblEscritorio3 =document.getElementById("lblEscritorio3")
const lblEscritorio4 =document.getElementById("lblEscritorio4")

const lblTicket = [lblTicket1,lblTicket2,lblTicket3,lblTicket4]
const lblEscritorio = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4]


//ESCUCHA PARA IMPRIMIR EN PANTALLA
socket.on('nowState', function(data) {
    actualizar(data.lastFour)
})

socket.on('updateState', function(data) {
    //deprecate for denege autoplay 
    // var audio = new Audio('audio/new-ticket.mp3')
    // audio.play()
    actualizar(data.lastFour)
})

function actualizar( lastFour ) {
    for( let i= 0; i < 4; i++){
        lblTicket[i].innerHTML = `Ticketsss: ${lastFour[i].number}`
        lblEscritorio[i].innerHTML = `Escritorio: ${lastFour[i].desk}`
    }
}