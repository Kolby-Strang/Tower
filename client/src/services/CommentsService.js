import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
    async getActiveComments(){
        const eventId = AppState.activeTowerEvent.id
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.activeComments = res.data
    }
    async createComment(commentData, eventId){
        commentData.eventId = eventId
        const res = await api.post('api/comments', commentData)
        AppState.activeComments.push(res.data)
    }
}


export const commentsService = new CommentsService()