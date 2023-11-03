import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"

class TicketsService{
    async getActiveComments(){
        const eventId = AppState.activeTowerEvent.id
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.activeTickets = res.data
    }
    async createTicket(eventId){
        const res = await api.post('api/tickets', {eventId})
        AppState.activeTickets.push(res.data)
        AppState.activeTowerEvent.ticketCount++
    }
    async getMyTickets(){
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data.map(ticket => new Ticket(ticket))
    }
    async deleteTicket(ticketId){
        await api.delete(`api/tickets/${ticketId}`)
        AppState.myTickets = AppState.myTickets.filter(ticket => ticket.id != ticketId)
    }

}


export const ticketsService = new TicketsService()