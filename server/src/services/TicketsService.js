import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile')
        return ticket
    }

    async getTicketsByUserId(accountId) {
        const tickets = await dbContext.Ticket.find({ accountId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return tickets
    }
    getTicketsByEventId(eventId) {
        const tickets = dbContext.Ticket.find({ eventId }).populate('profile')
        return tickets
    }
    async destroyTicketById(ticketId, userId) {
        const ticket = await dbContext.Ticket.findById(ticketId)
        if (!ticket) {
            throw new BadRequest(`${ticketId} is an invalid Ticket Id`)
        }
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden(`TICKET ${ticketId} IS NOT YOURS TO DELETE`)
        }
        ticket.remove()
        return `Ticket was deleted`
    }
}


export const ticketsService = new TicketsService()