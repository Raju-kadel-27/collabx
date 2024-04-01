import mongoose, { Document } from "mongoose";

export interface IWebhookEvent extends Document {
    event: string;
    data: string;
    timestamp: Date;
}

// e.g. for a reference
// {
//     "eventId": ObjectId("60a85784c227c509d2228a1a"),
//     "eventType": "ciCdError",
//     "eventData": {
//       "projectName": "MyProject",
//       "pipelineId": "123456",
//       "errorType": "BuildFailure",
//       "errorMessage": "Build failed due to compilation errors."
//     },
//     "timestamp": ISODate("2022-05-21T12:30:00.000Z"),
//     "processed": false,
//     "processingTimestamp": null,
//     "error": null,
//     "orderDetails": null,
//     "userRegistration": null
//   }


const WebhookEventSchema = new mongoose.Schema({

    eventId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

    eventType: { type: String, required: true },

    eventData: { type: mongoose.Schema.Types.Mixed, required: true },

    timestamp: { type: Date, default: Date.now, required: true },

    processed: { type: Boolean, default: false },

    processingTimestamp: { type: Date },

    error: String,

    orderDetails: {
        required: false,
        orderId: String,
        customerName: String,
    },

    userRegistration: {
        required: false,
        userId: String,
        email: String,
    },
});

const WebhookEventModel = mongoose.model<IWebhookEvent>("Webhook", WebhookEventSchema);

export default WebhookEventModel;
