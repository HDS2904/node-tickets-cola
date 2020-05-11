//IMPORTACIONES
const fs = require('fs')

//Clase TICKET
class Ticket {
    constructor( number, desk ){
        this.number = number
        this.desk = desk
    }
}

//CLASE CONTROL DE TICKETS (Propiedades y Métodos)
class TicketControl {

    constructor() {
        
        this.last = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.lastFour = []

        let data = require('../data/data-event')

        if( data.today === this.today ){
            this.last = data.last
            this.tickets = data.tickets
            this.lastFour = data.lastFour
        }else {
            this.restartProcess()
        }

    }

    restartProcess() {
        this.last = 0
        this.tickets = []
        this.lastFour = []
        this.saveFile()
    }

    nexTicket() {
        this.last += 1
        let ticket = new Ticket( this.last, null )
        this.tickets.push(ticket)
        this.saveFile()
        return `Ticket ${this.last}`
    }

    getLastTicket() {
        return `Ticket ${this.last}`
    }

    getLastFour(){
        return this.lastFour
    }

    attendTicket( desk ){
        if(this.tickets.length === 0){
            return 'No hay tickets disponibles'
        }
        let numberTicketAtt = this.tickets[0].number
        this.tickets.shift()
        let attendingTicket = new Ticket( numberTicketAtt, desk )
        this.lastFour.unshift( attendingTicket )
        if( this.lastFour.length > 4 ){
            this.lastFour.pop()
        }

        this.saveFile()
        return attendingTicket
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data-event.json', jsonDataString)
    }

}


//EXPORTACIONES
module.exports = {
    TicketControl
}