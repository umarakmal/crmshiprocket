const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const agentinputSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    disposition: {
      type: String,
    },
    subDisPosition1: {
      type: String,
    },
    pickup: {
      type: String,
    },
    pickupTime: {
      type: String,
    },
    quantityPickup: {
      type: String,
    },
    alternateNumber: {
      type: String,
    },
    courierRemarks: {
      type: String,
    },
    address: {
      type: String,
    },
    remark: {
      type: String,
    },
    call_back: {
      type: String,
    },
    uploaded_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uploaddata",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("AgentInput", agentinputSchema);
