const multer = require("multer");
const Uploaddata = require("../models/upload_data");
const Agentcti = require("../models/agent_cti");
const csv = require("csvtojson");
var path = require("path");
const AgentInput = require("../models/agent_input");
// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      req.formaterror = "Only .csv format allowed";
      return cb(null, "Only .csv allowed");
    }
  },
});

//Upload file
exports.uploaddata = (req, res) => {
  if (req.formaterror) {
    return res.status(500).send({
      success: false,
      message: `Only CSV files are allowed`,
      chk: "2",
    });
  }

  csv()
    .fromFile(req.file.path)

    .then((jsonObj) => {
      // console.log(jsonObj);
      var arrayToInsert = [];
      jsonObj.map(async (element) => {
        var temp = {
          Date: element.Date,
          Company_ID: element.Company_ID,
          Company_Name: element.Company_Name,
          AWB_Count: element.AWB_Count,
          Shipper_Address: element.Shipper_Address,
          Shipper_Pincode: element.Shipper_Pincode,
          Shipper_Contact_No: element.Shipper_Contact_No,
          Tier: element.Tier,
          Courier_Remarks: element.Courier_Remarks,
          del_essential: element.del_essential,
          ecom_essential: element.ecom_essential,
          sfx_essential: element.sfx_essential,
          xb_essential: element.xb_essential,
          bd_non_essential: element.bd_non_essential,
          del_non_essential: element.del_non_essential,
          ecom_non_essential: element.ecom_non_essential,
          ekart_non_essential: element.ekart_non_essential,
          fedex_non_essential: element.fedex_non_essential,
          sfx_non_essential: element.sfx_non_essential,
          wow_non_essential: element.wow_non_essential,
          xb_non_essential: element.xb_non_essential,
          gati_non_essential: element.gati_non_essential,
          amazoni_non_essential: element.amazoni_non_essential,
          dtdc_non_essential: element.dtdc_non_essential,
          kerry_indev_non_essential: element.kerry_indev_non_essential,
        };
        arrayToInsert.push(temp);
      });

      Uploaddata.insertMany(arrayToInsert, (err, result) => {
        if (result) {
          return res.status(200).json({
            SUCCESS: "data uploaded",
            chk: "0",
          });
        } else {
          return res.status(400).json({
            error: "error",
            chk: "0",
          });
        }
      });
    });
};
// Retrieve all User from the database.
exports.getData = async (req, res) => {
  try {
    const Shipper_Contact_No = req.query.Shipper_Contact_No;
    var data = await Uploaddata.find({ Shipper_Contact_No }).sort({ _id: -1 });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

// Retrieve all users from the database
exports.getDataWithPhone = async (req, res) => {
  try {
    const Shipper_Contact_No = req.body.Shipper_Contact_No;
    var data = await Uploaddata.findOne({ Shipper_Contact_No });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.agentCti = async (req, res) => {
  try {
    // Create
    var agentcti = await new Agentcti({
      rightPerson: req.body.rightPerson,
      disposition: req.body.disposition,
      subDisPosition1: req.body.subDisPosition1,
      shippersName: req.body.shippersName,
      shippersContactNumber: req.body.shippersContactNumber,
      customerType: req.body.customerType,
      readyPickup: req.body.readyPickup,
      pickupAddress: req.body.pickupAddress,
      quantityPickup: req.body.quantityPickup,
      alternateNumber: req.body.alternateNumber,
      courierRemarks: req.body.courierRemarks,
      address: req.body.address,
      remark: req.body.remark,

      uploaded_data: req.body.uploaded_data,
    });
    // Save agentCTI in the database
    await agentcti.save(agentcti);
    return res.status(200).json("Added Successfully!");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred.",
    });
  }
};

// Retrieve all User from the database.
exports.allagentcti = async (req, res) => {
  try {
    var startDate = req.body.date1;
    var endDate = req.body.date2;
    var data = await Agentcti.find({
      createdAt: { $gte: startDate, $lt: endDate },
    }).populate("uploaded_data");

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.agentInput = async (req, res) => {
  try {
    // Create
    var agentinput = await new AgentInput({
      disposition: req.body.disposition,
      subDisPosition1: req.body.subDisPosition1,
      pickupTime: req.body.pickupTime,
      pickup: req.body.pickup,
      quantityPickup: req.body.quantityPickup,
      alternateNumber: req.body.alternateNumber,
      courierRemarks: req.body.courierRemarks,
      address: req.body.address,
      remark: req.body.remark,
      call_back: req.body.call_back,
      uploaded_data: req.body.uploaded_data,
    });
    // Save agentCTI in the database
    await agentinput.save(agentinput);
    return res.status(200).json("Added Successfully!");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred.",
    });
  }
};

// Retrieve all User from the database.
exports.allagentinput = async (req, res) => {
  try {
    var startDate = req.body.date1;
    var endDate = req.body.date2;
    var data = await AgentInput.find({
      createdAt: { $gte: startDate, $lt: endDate },
    }).populate("uploaded_data");

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};
