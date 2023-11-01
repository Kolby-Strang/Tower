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


let thing =
{
    "_id": "654278e5eaa8e205e4057068",
    "creatorId": "65330f5800fc89b954fa12ed",
    "name": "Cat-Con",
    "description": "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
    "coverImg": "https://images.unsplash.com/photo-1559171667-74fe3499b5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
    "location": "At The Social Expo Center",
    "capacity": 157,
    "startDate": "2023-11-20T07:00:00.000Z",
    "type": "convention",
    "isCanceled": false,
    "createdAt": "2023-11-01T16:12:21.128Z",
    "updatedAt": "2023-11-01T16:12:21.128Z",
    "__v": 0,
    "ticketCount": 0,
    "id": "654278e5eaa8e205e4057068"
}