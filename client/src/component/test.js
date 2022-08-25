import React from "react";

const Test = () => {
  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Quick Example</h3>
                  </div>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputFile">File input</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFile"
                            >
                              Choose file
                            </label>
                          </div>
                          <div className="input-group-append">
                            <span className="input-group-text">Upload</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Check me out
                        </label>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Different Height</h3>
                  </div>
                  <div className="card-body">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder=".form-control-lg"
                    />
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Default input"
                    />
                    <br />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder=".form-control-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Test;
