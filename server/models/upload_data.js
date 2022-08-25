const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uploaddataSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    Date: {
      type: String,
    },
    Company_ID: {
      type: String,
    },
    Company_Name: {
      type: String,
    },
    AWB_Count: {
      type: String,
    },
    Shipper_Address: {
      type: String,
    },
    Shipper_Pincode: {
      type: String,
    },
    Shipper_Contact_No: {
      type: String,
    },
    Tier: {
      type: String,
    },
    Courier_Remarks: {
      type: String,
    },
    del_essential: {
      type: String,
    },
    ecom_essential: {
      type: String,
    },
    sfx_essential: {
      type: String,
    },
    xb_essential: {
      type: String,
    },
    bd_non_essential: {
      type: String,
    },
    del_non_essential: {
      type: String,
    },
    ecom_non_essential: {
      type: String,
    },
    ekart_non_essential: {
      type: String,
    },
    fedex_non_essential: {
      type: String,
    },
    sfx_non_essential: {
      type: String,
    },
    wow_non_essential: {
      type: String,
    },
    xb_non_essential: {
      type: String,
    },
    gati_non_essential: {
      type: String,
    },
    amazoni_non_essential: {
      type: String,
    },
    dtdc_non_essential: {
      type: String,
    },
    kerry_indev_non_essential: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Uploaddata", uploaddataSchema);
