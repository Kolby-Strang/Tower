export class TowerEvent{
    constructor(data){
        // ID'S
        this.id = data.id
        this.creatorId = data.creatorId

        // Display Data
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg

        // Meta Data
        this.location = data.location
        this.type = data.type

        // Boolean
        this.isCanceled = data.isCanceled

        // Ticket Counts
        this.capacity = data.capacity
        this.ticketCount = data.ticketCount

        // Dates
        this.startDate = new Date(data.startDate)
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}