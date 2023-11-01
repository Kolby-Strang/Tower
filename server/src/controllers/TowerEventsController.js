import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/comments', this.getCommentsByEventId)
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:eventId', this.editTowerEvent)
            .post('', this.createTowerEvent)
            .delete('/:eventId', this.cancelTowerEvent)
    }
    async getCommentsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await commentsService.getCommentsByEventId(eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getAllTowerEvents(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAllTowerEvents()
            res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
    async getTowerEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const towerEvent = await towerEventsService.getTowerEventById(eventId)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await ticketsService.getTicketsByEventId(eventId)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async editTowerEvent(req, res, next) {
        try {
            const userId = req.userInfo.id
            const eventId = req.params.eventId
            const editData = req.body
            const towerEvent = await towerEventsService.editTowerEvent(editData, eventId, userId)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async createTowerEvent(req, res, next) {
        try {
            const towerEventData = req.body
            const userId = req.userInfo.id
            towerEventData.creatorId = userId
            const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelTowerEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const towerEvent = await towerEventsService.cancelTowerEvent(eventId, userId)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
}