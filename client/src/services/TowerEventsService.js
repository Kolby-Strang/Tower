import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { api } from "./AxiosService"

class TowerEventsService{
    async getTowerEvents(){
        const res = await api.get('api/events')
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
        AppState.events = []
    }
    async deleteActiveEvent(){
        const eventId = AppState.activeTowerEvent.id
        const res = await api.delete(`api/events/${eventId}`)
        AppState.activeTowerEvent = new TowerEvent(res.data)
    }
    async editEvent(eventData){
        const eventId = eventData.id
        const res = await api.put(`api/events/${eventId}`, eventData)
        AppState.activeTowerEvent = new TowerEvent(res.data)
    }
    async createEvent(eventData){
        if(eventData.coverImg == ''){
            eventData.coverImg = undefined
        }
        const res = await api.post('api/events', eventData)
        const towerEvent = new TowerEvent(res.data)
        AppState.activeTowerEvent = towerEvent
        return towerEvent
    }
}


export const towerEventsService = new TowerEventsService()