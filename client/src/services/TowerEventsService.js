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
}


export const towerEventsService = new TowerEventsService()