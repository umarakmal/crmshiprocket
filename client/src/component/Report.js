import React, { useEffect, useState } from "react";
import Header from "./Header";
import "jquery/dist/jquery.min.js";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "../css/report.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import "react-datepicker/dist/react-datepicker.css";
import Menu from "./Menu";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Report = () => {
  const columns = [
    { field: "id", headerName: "S.No.", width: 120 },
    { field: "disposition", headerName: "Disposition", width: 150 },
    { field: "subDisPosition1", headerName: "Sub Dispostion-1", width: 150 },
    {
      field: "pickup",
      headerName: "Sir/Mam your shipments are ready today for pickup.?",
      width: 150,
    },
    {
      field: "pickupTime",
      headerName: "By what time you will be available at your pickup address.?",
      width: 150,
    },
    {
      field: "quantityPickup",
      headerName: "What is the quantity of your Pick-up.?",
      width: 150,
    },
    {
      field: "alternateNumber",
      headerName: "would request you to share your alternative Number.?",
      width: 150,
    },
    {
      field: "courierRemarks",
      headerName:
        "Is Courier Remarks Correct (Please check after reading the remarks)",
      width: 150,
    },

    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    { field: "remark", headerName: "Remark", width: 150 },
    { field: "call_back", headerName: "Call Back", width: 150 },
    { field: "Date", headerName: "Date", width: 150 },
    { field: "Company_ID", headerName: "Company ID", width: 150 },
    { field: "Company_Name", headerName: "Company Name", width: 150 },
    { field: "AWB_Count", headerName: "AWB Count", width: 150 },
    { field: "Shipper_Address", headerName: "Shipper_Address", width: 150 },
    { field: "Shipper_Pincode", headerName: "Shipper Pincode", width: 150 },
    {
      field: "Shipper_Contact_Number",
      headerName: "Shipper Contact_No",
      width: 150,
    },
    { field: "Tier", headerName: "Tier ", width: 150 },
    { field: "Courier_remarks", headerName: "Courier Remarks", width: 150 },
    { field: "del_essential", headerName: "Del**(Essential)", width: 150 },
    { field: "ecom_essential", headerName: "ECOM**(Essential)", width: 150 },
    { field: "sfx_essential", headerName: "SFX**(Essential) ", width: 150 },
    { field: "xb_essential", headerName: "XB**(Essential)", width: 150 },
    {
      field: "bd_non_essential",
      headerName: "BD**(Non Essential)",
      width: 150,
    },
    {
      field: "del_non_essential",
      headerName: "DEL**(Non Essential)",
      width: 150,
    },
    {
      field: "ecom_non_essential",
      headerName: "ECOM**(Non Essential)",
      width: 150,
    },
    {
      field: "ekart_non_essential",
      headerName: "Ekart**(Non Essential)",
      width: 150,
    },
    {
      field: "fedex_non_essential",
      headerName: "FEDEX**(Non Essential)",
      width: 150,
    },
    {
      field: "sfx_non_essential",
      headerName: "SFX**(Non Essential)",
      width: 150,
    },
    {
      field: "wow_non_essential",
      headerName: "WOW**(Non Essential)",
      width: 150,
    },
    {
      field: "xb_non_essential",
      headerName: "XB**(Non Essential)",
      width: 150,
    },
    {
      field: "gati_non_essential",
      headerName: "GATI**(Non Essential)",
      width: 150,
    },
    {
      field: "amazoni_non_essential",
      headerName: "AMAZON (Non Essential)",
      width: 150,
    },
    {
      field: "dtdc_non_essential",
      headerName: "DTDC (Non Essential)",
      width: 150,
    },
    {
      field: "kerry_indev_non_essential",
      headerName: "Kerry Indev (Non Essential):",
      width: 150,
    },
  ];
  const [getuserdata, setUserdata] = useState([]);
  const [startDate, setStartDate] = useState("");
  // console.log(startDate);
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    const date1 = startDate.toISOString();
    const date2 = endDate.toISOString();
    var body = {
      date1,
      date2,
    };

    const res = await fetch("/api/allagentinput", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date1,
        date2,
      }),
    });
    {
      const data = await res.json();
      console.log(data);
      setUserdata(data);
    }

    setShow(true);
  };

  const rows = getuserdata.map((element, index) => ({
    id: index + 1,
    _id: element._id,
    disposition: element.disposition,
    subDisPosition1: element.subDisPosition1,
    pickup: element.pickup,
    pickupTime: element.pickupTime,
    quantityPickup: element.quantityPickup,
    alternateNumber: element.alternateNumber,
    courierRemarks: element.courierRemarks,
    address: element.address,
    remark: element.remark,
    call_back: element.call_back,
    Date: element.uploaded_data.Date,
    Company_ID: element.uploaded_data.Company_ID,
    Company_Name: element.uploaded_data.Company_Name,
    AWB_Count: element.uploaded_data.AWB_Count,
    Shipper_Address: element.uploaded_data.Shipper_Address,
    Shipper_Pincode: element.uploaded_data.Shipper_Pincode,
    Shipper_Contact_Number: element.uploaded_data.Shipper_Contact_Number,
    Tier: element.uploaded_data.Tier,
    Courier_remarks: element.uploaded_data.Courier_remarks,
    del_essential: element.uploaded_data.del_essential,
    ecom_essential: element.uploaded_data.ecom_essential,
    sfx_essential: element.uploaded_data.sfx_essential,
    xb_essential: element.uploaded_data.xb_essential,
    bd_non_essential: element.uploaded_data.bd_non_essential,
    del_non_essential: element.uploaded_data.del_non_essential,
    ecom_non_essential: element.uploaded_data.ecom_non_essential,
    ekart_non_essential: element.uploaded_data.ekart_non_essential,
    fedex_non_essential: element.uploaded_data.fedex_non_essential,
    sfx_non_essential: element.uploaded_data.sfx_non_essential,
    wow_non_essential: element.uploaded_data.wow_non_essential,
    xb_non_essential: element.uploaded_data.xb_non_essential,
    gati_non_essential: element.uploaded_data.gati_non_essential,
    amazoni_non_essential: element.uploaded_data.amazoni_non_essential,
    dtdc_non_essential: element.uploaded_data.dtdc_non_essential,
    kerry_indev_non_essential: element.uploaded_data.kerry_indev_non_essential,
  }));

  return (
    <div>
      <Header />
      <Menu />
      <div style={{ minHeight: "36rem" }} className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="col-md-12 mt-2">
              <div className="card card-dark">
                <div className="card-header">
                  <center>
                    <h2 className="card-title">Report</h2>
                  </center>
                </div>

                <div className="container-fluid">
                  <form>
                    <div className="card-body">
                      <div className="row mt-2">
                        <div className="form-group offset-md-3 ">
                          <label htmlFor="date1" className="form-label">
                            From
                          </label>

                          <DatePicker
                            selected={startDate}
                            selectsStart
                            placeholderText="Select Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            id="date1"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="date2" className="form-label">
                            To
                          </label>
                          <DatePicker
                            selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            selectsEnd
                            placeholderText="Select Date"
                            minDate={startDate}
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            id="date2"
                            autoComplete="off"
                          />
                        </div>
                        <button
                          type="submit"
                          style={{ height: "40px", marginTop: "25px" }}
                          onClick={postData}
                          className="btn btn-primary "
                          id="submit"
                        >
                          Get Data
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div style={{ margin: "15px" }} className="card">
                  {show ? (
                    <DataGrid
                      style={{ fontWeight: "400" }}
                      components={{
                        Toolbar: MyExportButton,
                      }}
                      autoHeight
                      getRowId={(element) => element._id}
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
