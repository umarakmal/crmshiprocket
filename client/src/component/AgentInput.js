import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../css/meradoc.css";
import $, { css } from "jquery";

const AgentInput = () => {
  const history = useHistory();
  const [inpval, setINP] = useState({
    disposition: "",
    subDisPosition1: "",
    pickup: "",
    pickupTime: "",
    quantityPickup: "",
    alternateNumber: "",
    courierRemarks: "",
    address: "",
    remark: "",
    call_back: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (event) => {
    event.preventDefault();
    console.log(inpval);
    const {
      disposition,
      subDisPosition1,
      pickup,
      pickupTime,
      quantityPickup,
      alternateNumber,
      courierRemarks,
      address,
      remark,
      call_back,
    } = inpval;
    const uploaded_data = val._id;
    console.log(uploaded_data);
    if (!disposition || !remark) {
      return false;
    } else {
      const res = await fetch(`/api/agentinput`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          disposition,
          subDisPosition1,
          pickup,
          pickupTime,
          quantityPickup,
          alternateNumber,
          courierRemarks,
          address,
          remark,
          call_back,
          uploaded_data,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        toast.error("Error Occured");
      } else {
        //   history.push("/users");
        toast.success("User added successfully");
      }
    }
  };
  const [Shippers_Contact_No, setShipper_Contact_No] = useState("");
  const [val, setVal] = useState([]);

  const setdata1 = (e) => {
    const { name, value } = e.target;
    setShipper_Contact_No((preval) => {
      return {
        ...Shippers_Contact_No,
        [name]: value,
      };
    });
  };

  // //Get Data when click get data

  const getData = async (e) => {
    e.preventDefault();
    // const Shipper_Contact_No = Shipper_Contact_No;
    const Shipper_Contact_No = Shippers_Contact_No.Shippers_Contact_No;
    console.log(Shipper_Contact_No.Shipper_Contact_No);
    const res2 = await fetch(`/api/getdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Shipper_Contact_No,
      }),
    });

    const data = await res2.json();
    console.log(data);
    // const x = data[0];
    if (res2.status === 422 || !data) {
      console.log("error ");
    } else {
      //  x = data[0];
      setVal(data);
      console.log(data);
    }
  };

  useEffect(() => {
    $(function () {
      $("#select1").on("change", function () {
        if ($(this).val() === "callback") {
          $("#callbackdiv").css("display", "block");
          $("#select2").hide();
          $("#select3").hide();
          $("#select4").hide();
        } else if ($(this).val() === "calldiscon") {
          $("#select3").show();
          $("#callbackdiv").hide();
          $("#select2").hide();
          $("#select4").hide();
        } else if ($(this).val() === "contacted") {
          $("#select4").css("display", "block");
          $("#callbackdiv").css("display", "none");
          $("#select2").hide();
          $("#select3").hide();
        } else if ($(this).val() === "notcontacted") {
          $("#callbackdiv").hide();
          $("#select2").css("display", "block");
          $("#select3").hide();
          $("#select4").hide();
        } else if ($(this).val() === "sel") {
          $("#select3").show();
          $("#callbackdiv").hide();
          $("#select2").hide();
          $("#select4").hide();
        }
      });
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="content-wrapper">
        <div className=" col-md-12  mt-2">
          <div className="card card-dark">
            <div className="card-header">
              <h3 className="card-title">Get Data</h3>
            </div>
            <form noValidate id="f2">
              <div className="card-body">
                <div className="row">
                  <label
                    style={{ margin: "6px", paddingTop: "4px" }}
                    htmlFor="inputName"
                  >
                    Phone
                  </label>
                  <input
                    style={{ margin: "5px" }}
                    type="text"
                    className="form-control col-md-4"
                    name="Shippers_Contact_No"
                    // value={Shipper_Contact_No}
                    onChange={setdata1}
                    id="inputName"
                    placeholder=""
                    required
                  />

                  <button
                    style={{ margin: "5px" }}
                    // style={{ marginLeft: "37%", marginTop: "-6.5%" }}
                    type="submit"
                    onClick={getData}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <form id="f1" onSubmit={addinpdata}>
              <div className="row">
                <div style={{ fontSize: "14px" }} className="col-md-6">
                  <div className="card card-dark">
                    <div className="card-header">
                      <h3 className="card-title">Get Data</h3>
                    </div>
                    <div className="card-body">
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className="form-group">
                          <label htmlFor="inputName">User Type</label>

                          <input
                            type="text"
                            className="form-control"
                            name="Company_ID"
                            value={val.Company_ID ? val.Company_ID : ""}
                            onChange={setdata}
                            id="inputName"
                            placeholder=""
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="inputInt">Company Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Company_Name"
                            value={val.Company_Name ? val.Company_Name : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">AWB Count </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Awb_Count"
                            value={val.AWB_Count ? val.AWB_Count : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">Shipper's Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shipper_Address"
                            value={
                              val.Shipper_Address ? val.Shipper_Address : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">Shipper Pincode</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shipper_Pincode"
                            value={
                              val.Shipper_Pincode ? val.Shipper_Pincode : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">Date </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Date "
                            value={val.Date ? val.Date : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">Shipper Contact_No </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Shipper_Contact_No"
                            value={
                              val.Shipper_Contact_No
                                ? val.Shipper_Contact_No
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">Tier </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Tier"
                            value={val.Tier ? val.Tier : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">Courier Remarks</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Courier_Remarks"
                            value={
                              val.Courier_Remarks ? val.Courier_Remarks : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">Del**(Essential) </label>
                          <input
                            type="text"
                            className="form-control"
                            name="del_essential"
                            value={val.del_essential ? val.del_essential : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">SFX**(Essential)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="sfx_essential"
                            value={val.sfx_essential ? val.sfx_essential : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">XB**(Essential)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="xb_essential"
                            value={val.xb_essential ? val.xb_essential : ""}
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">BD**(Non Essential)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="bd_non_essential"
                            value={
                              val.bd_non_essential ? val.bd_non_essential : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">DEL**(Non Essential)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="del_non_essential"
                            value={
                              val.del_non_essential ? val.del_non_essential : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            ECOM**(Non Essential)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="ecom_non_essential"
                            value={
                              val.ecom_non_essential
                                ? val.ecom_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            Ekart**(Non Essential)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="ekart_non_essential"
                            value={
                              val.ekart_non_essential
                                ? val.ekart_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            FEDEX**(Non Essential){" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="fedex_non_essential"
                            value={
                              val.fedex_non_essential
                                ? val.fedex_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">SFX**(Non Essential)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="sfx_non_essential"
                            value={
                              val.sfx_non_essential ? val.sfx_non_essential : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">XB**(Non Essential)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="xb_non_essential"
                            value={
                              val.xb_non_essential ? val.xb_non_essential : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            WOW**(Non Essential){" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="wow_non_essential"
                            value={
                              val.wow_non_essential ? val.wow_non_essential : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            Gati**(Non Essential){" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="gati_non_essential"
                            value={
                              val.gati_non_essential
                                ? val.gati_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            Amazon (Non Essential){" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="amazoni_non_essential"
                            value={
                              val.amazoni_non_essential
                                ? val.amazoni_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-evenly" }}
                        className="row"
                      >
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            DTDC (Non Essential){" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="dtdc_non_essential"
                            value={
                              val.dtdc_non_essential
                                ? val.dtdc_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                        <div className=" form-group">
                          <label htmlFor="inputInt">
                            Kerry Indev (Non Essential){" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="kerry_indev_non_essential"
                            value={
                              val.kerry_indev_non_essential
                                ? val.kerry_indev_non_essential
                                : ""
                            }
                            onChange={setdata}
                            id="inputInt"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "14px" }} className="col-md-6">
                  <div className="card card-dark ">
                    <div className="card-header">
                      <h3 className="card-title">Agent Input</h3>
                    </div>
                    <div className="card-body">
                      <div className=" form-group">
                        <label htmlFor="xyz">Disposition</label>
                        <select
                          id="select1"
                          name="disposition"
                          onChange={setdata}
                          className="form-control"
                          required
                        >
                          <option value="sel">Select</option>
                          <option value="calldiscon">Call Disconnected</option>
                          <option value="callback">Call Back</option>
                          <option value="contacted">Contacted</option>
                          <option value="notcontacted">Not Contacted</option>
                        </select>
                      </div>

                      <div id="select3" className=" form-group">
                        <label htmlFor="inputState2">Sub Dispostion-1</label>
                        <select
                          name="subDisPosition1"
                          onChange={setdata}
                          className="form-control"
                        >
                          <option>Select</option>
                        </select>
                      </div>

                      <div
                        style={{ display: "none" }}
                        id="select2"
                        className=" form-group"
                      >
                        <label htmlFor="inputState2">Sub Dispostion-1</label>
                        <select
                          name="subDisPosition1"
                          onChange={setdata}
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>Invalid Number</option>
                          <option>No Response/blank</option>
                          <option>Not Reachable</option>
                          <option>Ringing</option>
                          <option>Switched Off</option>
                        </select>
                      </div>

                      <div
                        style={{ display: "none" }}
                        id="select4"
                        className=" form-group"
                      >
                        <label htmlFor="inputState2">Sub Dispostion-1</label>
                        <select
                          name="subDisPosition1"
                          onChange={setdata}
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>Call on alternate number</option>
                          <option>Divert to helpline number</option>
                          <option>Follow up</option>
                          <option>Language Barrier</option>
                          <option>No pick - Operational issue</option>
                          <option>No pick - Shipment not ready</option>
                          <option>Not ready to confirm</option>
                          <option>Order cancelled by seller/buyer</option>
                          <option>Pick up requested</option>
                          <option>Shipment already picked up</option>
                          <option>Shipper closed/Not Operational</option>
                          <option>Test call</option>
                          <option>Wrong number</option>
                        </select>
                      </div>

                      <div
                        id="callbackdiv"
                        style={{ display: "none" }}
                        className=" form-group "
                      >
                        <label htmlFor="available_time" className="form-label">
                          Call Back
                        </label>
                        <input
                          type="datetime-local"
                          value={inpval.call_back}
                          onChange={setdata}
                          name="call_back"
                          className="form-control"
                          id="available_time"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className=" form-group">
                        <label htmlFor="inputState22">
                          Sir/Mam your shipments are ready today for pickup.?
                        </label>
                        <select
                          id="inputState22"
                          name="pickup"
                          value={inpval.pickup}
                          onChange={setdata}
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>

                      <div className=" form-group ">
                        <label htmlFor="available_time" className="form-label">
                          By what time you will be available at your pickup
                          address ?
                        </label>

                        <input
                          type="datetime-local"
                          value={inpval.pickupTime}
                          onChange={setdata}
                          name="pickupTime"
                          className="form-control"
                          id="available_time"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>

                      <div className=" form-group ">
                        <label htmlFor="exampleInputPass">
                          What is the quantity of your Pick-up ?
                        </label>
                        <input
                          type="text"
                          value={inpval.quantityPickup}
                          onChange={setdata}
                          name="quantityPickup"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div className=" form-group ">
                        <label htmlFor="exampleInputPass">
                          would request you to share your alternative Number ?
                        </label>
                        <input
                          type="text"
                          value={inpval.alternateNumber}
                          onChange={setdata}
                          name="alternateNumber"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div className=" form-group">
                        <label htmlFor="inputState2">
                          Is Courier Remarks Correct (Please check after reading
                          the remarks)
                        </label>
                        <select
                          id="inputState2"
                          name="courierRemarks"
                          onChange={setdata}
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Not able to validate</option>
                        </select>
                      </div>

                      <div className=" form-group ">
                        <label htmlFor="exampleInputPass">Address</label>
                        <input
                          type="text"
                          value={inpval.address}
                          onChange={setdata}
                          name="address"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div className=" form-group ">
                        <label htmlFor="exampleInputPass">Remark</label>
                        <input
                          type="text"
                          value={inpval.remark}
                          onChange={setdata}
                          name="remark"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    marginLeft: "47%",
                    marginBottom: "10px",
                  }}
                  type="submit"
                  // onClick={addinpdata}
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <br></br>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentInput;
