import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async getActiveComments(){
        const eventId = AppState.activeTowerEvent.id
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Tickets', res.data)
        AppState.activeTickets = res.data
    }
    async createTicket(eventId){
        const res = await api.post('api/tickets', {eventId})
        AppState.activeTickets.push(res.data)
        AppState.activeTowerEvent.ticketCount++
    }

}


export const ticketsService = new TicketsService()