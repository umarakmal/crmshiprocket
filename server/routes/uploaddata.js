const express = require("express");
const router = express.Router();

const {
  uploaddata,
  upload,
  getData,
  agentCti,
  allagentcti,
  getDataWithPhone,
  agentInput,
  allagentinput,
} = require("../controllers/uploaddata");

router.post("/uploadfile", upload.single("csv"), uploaddata);
router.get(`/uploadeddata`, getData);
router.post("/getdata", getDataWithPhone);
router.post("/agentinput", agentInput);
router.post("/agentcti", agentCti);
router.post("/allagentcti", allagentcti);
router.post("/allagentinput", allagentinput);
module.exports = router;
