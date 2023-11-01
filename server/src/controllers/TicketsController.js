import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.destroyTicketById)
    }
    async createTicket(req, res, next) {
        try {
            const userId = req.userInfo.id
            const ticketData = req.body
            ticketData.accountId = userId
            const ticket = await ticketsService.createTicket(ticketData)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async destroyTicketById(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            const message = await ticketsService.destroyTicketById(ticketId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}