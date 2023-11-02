import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService{
    async getTowerEvents(){
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.events = res.data.map(eventPOJO => new TowerEvent(eventPOJO))
    }
    async getActiveTowerEvent(eventId){
        const res = await api.get(`api/events/${eventId}`)
        AppState.activeTowerEvent = new TowerEvent(res.data)
    }
    clearData(){
        AppState.activeTowerEvent = null
        AppState.activeComments = []
        AppState.activeTickets = []
    }
    async deleteActiveEvent(){
        const eventId = AppState.activeTowerEvent.id
        const res = await api.delete(`api/events/${eventId}`)
        AppState.activeTowerEvent = new TowerEvent(res.data)
    }
}


export const towerEventsService = new TowerEventsService()