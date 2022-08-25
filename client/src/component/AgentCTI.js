import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Layout from "./Layout";
import "../css/meradoc.css";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import { isAuth } from "../auth/helpers";
const AgentCTI = () => {
  // const { search } = useLocation;
  // const p = new URLSearchParams(search);
  console.log(useLocation().search);
  const query = new URLSearchParams(useLocation().search);
  const Shipper_Contact_No = query.get("Shipper_Contact_No")
    ? query.get("Shipper_Contact_No")
    : ""(
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        function () {
          "use strict";

          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.querySelectorAll(".needs-validation");

          // Loop over them and prevent submission
          Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
              "submit",
              function (event) {
                if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
                }

                form.classList.add("was-validated");
              },
              false
            );
          });
        }
      )();

  const history = useHistory();
  const [inpval, setINP] = useState({
    rightPerson: "",
    shipper_name: "",
    shipper_contact: "",
    customer_type: "",
    disposition: "",
    subDisposition1: "",
    call_back: "",
    pickup: "",
    pickupTime: "",
    quantityPickup: "",
    alternateNumber: "",
    courierRemarks: "",
    address: "",
    remark: "",
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

    const {
      rightPerson,
      shipper_name,
      shipper_contact,
      customer_type,
      disposition,
      subDisposition1,
      call_back,
      pickup,
      pickupTime,
      quantityPickup,
      alternateNumber,
      courierRemarks,
      remark,
      address,
    } = inpval;
    const uploaded_data = val._id;
    console.log(uploaded_data);
    if (!rightPerson) {
      return false;
    } else {
      const res = await fetch(`/api/agentcti`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          rightPerson,
          shipper_name,
          shipper_contact,
          customer_type,
          disposition,
          subDisposition1,
          call_back,
          pickup,
          pickupTime,
          quantityPickup,
          alternateNumber,
          courierRemarks,
          remark,
          address,
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

  const [val, setVal] = useState([]);

  //Get Data when click get data
  const showData = async (e) => {
    const res2 = await fetch(
      `/api/uploadeddata?Shipper_Contact_No=${Shipper_Contact_No}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res2.json();

    const x = data[0];
    // console.log(x);
    if (res2.status === 422 || !data) {
      console.log("error ");
    } else {
      // var x = data[0];
      setVal(x);
    }
  };
  useEffect(() => {
    showData();
  }, []);

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
      $("#selectright").on("change", function () {
        if ($(this).val() === "yes") {
          $("#customertype").show();
          $("#courierremarks").show();
          $("#readytodaypickup").show();
          $("#addresspickuptime").show();
          $("#quantitypickup").show();
          $("#alternativenumber").show();
          $("#shippername").hide();
          $("#shippercontactnumber").hide();
          $("#yesshowmsg").show();
          $("#noshowmsg").hide();
        } else if ($(this).val() === "no") {
          $("#customertype").hide();
          $("#courierremarks").hide();
          $("#readytodaypickup").hide();
          $("#addresspickuptime").hide();
          $("#quantitypickup").hide();
          $("#alternativenumber").hide();
          $("#shippername").show();
          $("#shippercontactnumber").show();
          $("#yesshowmsg").hide();
          $("#noshowmsg").show();
        } else if ($(this).val() === "sele") {
          $("#customertype").hide();
          $("#courierremarks").hide();
          $("#readytodaypickup").hide();
          $("#addresspickuptime").hide();
          $("#quantitypickup").hide();
          $("#alternativenumber").hide();
          $("#shippername").show();
          $("#shippercontactnumber").show();
          $("#yesshowmsg").hide();
          $("#noshowmsg").show();
        }
      });
    });
  }, []);

  return (
    <>
      <Layout />
      <ToastContainer />
      <div style={{ marginLeft: "auto" }} className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form id="f1" onSubmit={addinpdata}>
              <div className="row mt-5">
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
                      <p>
                        Good morning my name is {isAuth().name}. I’m calling
                        from Shiprocket, This call is in regards to the pending
                        pickup of your shipment. Am I speaking with the
                        representative of company (Company name) I would like to
                        confirm if you are the right contact person to handover
                        the shipment with AWB (confirm AWB no)?{" "}
                      </p>
                      <br></br>
                      <div className=" form-group">
                        <label htmlFor="xyz">Right Person</label>
                        <select
                          id="selectright"
                          name="rightPerson"
                          onChange={setdata}
                          className="form-control"
                          required
                        >
                          <option value="sele">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
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
                      <div id="readytodaypickup" className=" form-group">
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

                      <div id="addresspickuptime" className=" form-group ">
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

                      <div id="quantitypickup" className=" form-group ">
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
                      <div id="alternativenumber" className=" form-group ">
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
                      <div id="shippername" className=" form-group ">
                        <label htmlFor="exampleInputPass">Shipper’s name</label>
                        <input
                          type="text"
                          value={inpval.shipper_name}
                          onChange={setdata}
                          name="shipper_name"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div id="shippercontactnumber" className=" form-group ">
                        <label htmlFor="exampleInputPass">
                          Shipper’s contact number
                        </label>
                        <input
                          type="text"
                          value={inpval.shipper_contact}
                          onChange={setdata}
                          name="shipper_contact"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div id="courierremarks" className=" form-group">
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
                      <div id="customertype" className=" form-group">
                        <label htmlFor="inputState2">Customer Type</label>
                        <select
                          id="inputState45"
                          name="customer_type"
                          onChange={setdata}
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>Shipper</option>
                          <option>Seller</option>
                        </select>
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
                      <br></br>
                      <p id="yesshowmsg">
                        (In case the seller is unable to confirm the details
                        then the following script will be used). Sorry sir/mam,
                        unfortunately the details you have provided me does not
                        match the respective account and hence I won’t be able
                        to assist you further. Sir/mam Please ready 1 label and
                        2 manifest copy at the time of pickup Thank you for your
                        time, have a nice day ahead.
                      </p>
                      <p id="noshowmsg">
                        Thank you so much for sharing the details for the
                        concerned person we will surely connect with Mr/Ms/Miss
                        for further course of action. Thanks for giving your
                        valuable time, have a nice day.
                      </p>
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

export default AgentCTI;
