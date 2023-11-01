import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 800 },
    coverImg: { type: String, maxLength: 1000, required: true, default: 'https://jandevents.com/wp-content/uploads/jand-party.jpg' },
    location: { type: String, maxLength: 100 },
    capacity: { type: Number, min: 1, max: 1000000000, required: true },
    startDate: { type: Date, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
    isCanceled: { type: Boolean, required: true, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})