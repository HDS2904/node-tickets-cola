//IMPORTACIONES
const { io } = require('../server')
const { TicketControl } = require('../class/ticket-control')

//INICIALIZANDO CLASE (Objeto)
const ticketControl = new TicketControl()

//ACCIONES CON EL FRONT-END y BACKEND
io.on('connection', (client) => {

    client.on('nexTicket', (data, callback) => {
            
        let nTicket = ticketControl.nexTicket()

        callback(nTicket)
    })

   client.emit('nowState', {
       now: ticketControl.getLastTicket(),
       lastFour: ticketControl.getLastFour()
   })

   client.on('attendTicket', ( data, callback ) => {
       if( !data.desk ){
            return callback({
                err: true,
                message: 'El escritorio es obligatorio'
            })
       }
       
       let attend = ticketControl.attendTicket( data.desk )
        client.broadcast.emit('updateState', {
            lastFour: ticketControl.getLastFour()
        })
       callback( attend )
   })

})

