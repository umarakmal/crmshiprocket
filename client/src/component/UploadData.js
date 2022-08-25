import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import Menu from "./Menu";
import axios from "axios";
import { saveAs } from "file-saver";

const UploadData = () => {
  (function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                // event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();

  // console.log(getuserdata);
  const [file, setFile] = useState("");
  const history = useHistory();
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  //Upload File
  const addFile = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("csv", file);

    const res = await fetch(`/api/uploadfile`, {
      method: "POST",
      body: formData,
    });

    // console.log(res.status.);
    formData = await res.json();
    console.log(formData.chk);
    if (formData.chk == "0") {
      toast.success("Updated Sucessfully");
    } else if (formData.chk == "1") {
      toast.error(formData.error);
    } else if (formData.chk == "2") {
      toast.error("Only CSV files are allowed!");
    }
  };

  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div style={{ minHeight: "36rem" }} className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 mt-2">
                <div className="card card-dark">
                  <div className="card-header">
                    <h3 className="card-title">Upload Data</h3>
                  </div>

                  <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={addFile}>
                      <div className="row">
                        <div className="form-group">
                          <label
                            htmlFor="file"
                            className="form-label text-muted"
                          >
                            Upload File
                          </label>
                          <input
                            filename="csvfile"
                            onChange={handleFile}
                            //   style={{ width: "50%" }}
                            className="form-control-file"
                            type="file"
                            id="file"
                            aria-label="file example"
                            required
                          />
                          <div className="invalid-feedback ">
                            Please choose a csv file
                          </div>
                          <button
                            style={{ marginTop: "15px" }}
                            type="submit"
                            className="btn btn-primary"
                          >
                            Upload
                          </button>
                        </div>

                        <div className="col-md-6 mt-2 offset-md-2">
                          <div className="form-group">
                            <h6>Download upload csv format from below:</h6>
                            <Link
                              style={{ fontWeight: "bolder" }}
                              to="/csvsample.csv"
                              target="_blank"
                              download
                            >
                              Download Sample
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
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

export default UploadData;
