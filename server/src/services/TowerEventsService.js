import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
    async getAllTowerEvents() {
        const towerEvents = await dbContext.TowerEvent.find().populate('ticketCount')
        return towerEvents
    }
    async getTowerEventById(eventId) {
        const towerEvent = await dbContext.TowerEvent.findById(eventId)
        if (!towerEvent) {
            throw new BadRequest(`${eventId} Is an invalid Event Id`)
        }
        await towerEvent.populate('ticketCount')
        return towerEvent
    }
    async editTowerEvent(editData, eventId, userId) {
        const towerEvent = await this.getTowerEventById(eventId)
        if (towerEvent.creatorId.toString() != userId) {
            throw new Forbidden(`${towerEvent.name} IS NOT YOUR EVENT TO EDIT`)
        }
        if (towerEvent.isCanceled) {
            throw new BadRequest('Cannot Edit a Cancelled Event')
        }
        // TODO maybe ask jake about this
        // const keys = Object.keys(editData)
        // const towerKeys = Object.keys(towerEvent)
        // keys.forEach(key => {
        //     if (key != 'id' && key != 'creatorId' && towerKeys.includes(key)) {
        //         towerEvent[key] = editData[key]
        //     }
        // })

        towerEvent.name = editData.name || towerEvent.name
        towerEvent.description = editData.description || towerEvent.description
        towerEvent.coverImg = editData.coverImg || towerEvent.coverImg
        towerEvent.location = editData.location || towerEvent.location
        towerEvent.capacity = editData.capacity || towerEvent.capacity
        towerEvent.startDate = editData.startDate ? new Date(editData.startDate) : towerEvent.startDate
        towerEvent.type = editData.type || towerEvent.type

        towerEvent.save()
        return towerEvent
    }
    async createTowerEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvent.create(towerEventData)
        await towerEvent.populate('ticketCount')
        return towerEvent
    }
    async cancelTowerEvent(eventId, userId) {
        const towerEvent = await this.getTowerEventById(eventId)
        if (towerEvent.creatorId.toString() != userId) {
            throw new Forbidden(`${towerEvent.name} IS NOT YOUR EVENT TO EDIT`)
        }
        towerEvent.isCanceled = true
        towerEvent.save()
        return towerEvent
    }

}

export const towerEventsService = new TowerEventsService()