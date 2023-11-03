import { TowerEvent } from "./TowerEvent"

export class Ticket{
    constructor(data){
        this.id = data.id
        this.event = new TowerEvent(data.event)
    }
}


const thing = {accountId:"65330f5800fc89b954fa12ed",
createdAt:"2023-11-01T18:42:27.602Z",
event:Object,
eventId:"65429c13ef15ed1a55c666bc",
id:"65429c13ef15ed1a55c666bf",
updatedAt:"2023-11-01T18:42:27.602Z",
}