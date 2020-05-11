
//DEFINIENDO LA VARIABLE OBSERVADORA
const socket = io()

//CONTROL CONEXION
socket.on('connect', function () {
    console.log('Hola bienvenido')
})

socket.on('disconnect', function() {
    console.log('Desconectado')
})

//FUNCION OBTENER DATOS POR URL
const searchParams = new URLSearchParams( window.location.search )

if( !searchParams.has('desk') ){
    window.location = 'index.html'
    throw new error('Es necesario poner el escritorio')
}

const desk = searchParams.get('desk')

document.getElementById('titulo').innerHTML = `Escritorio: ${desk}`

document.getElementById('accion').addEventListener('click', function(){
    socket.emit('attendTicket', { desk: desk }, function( resp ) {
        if(resp === 'No hay tickets disponibles'){
            alert(resp)
            return
        }
        document.getElementById('resalt').innerHTML = resp.number
    } )
    

})