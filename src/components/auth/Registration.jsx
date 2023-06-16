import React from "react";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import { useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { RegistrationRequest } from "../../apiRequest/ApiRequest";

const Registration = () => {
  let navigate = useNavigate();

  let emailRef,
    NameRef,
    passwordRef = useRef();

  const onRegistration = async () => {

    let email = emailRef.value;
    let name = NameRef.value;
    let password = passwordRef.value;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required !");
    } else if (IsEmpty(name)) {
      ErrorToast("First Name Required !");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required !");
    } else {
      let result = await RegistrationRequest(email, name, password);
      console.log({result})
      if (result === true) {
        navigate("/login");
      }
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90  p-4">
            <div className="card-body">
              <h4 className="text-start">Sign Up</h4>
              <hr />
              <div className="row m-0 p-0">
              <div className="col-md-12 text-start p-2">
                  <label>Name</label>
                  <input
                    ref={(input) => (NameRef = input)}
                    placeholder="enter your name "
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="col-md-12 text-start p-2">
                  <label>Email Address</label>
                  <input
                    ref={(input) => (emailRef = input)}
                    placeholder="enter your e-mail"
                    className="form-control"
                    type="email"
                  />
                </div>

                <div className="col-md-12 text-start p-2">
                  <label>Password</label>
                  <input
                    ref={(input) => (passwordRef = input)}
                    placeholder="enter your password"
                    className="form-control"
                    type="password"
                  />
                </div>
              </div>
              <div className="row m-0  p-0">
                <div className="col-md-4 text-start p-2">
                  <button
                    onClick={onRegistration}
                    className="btn w-100 mt-2 btn-success"
                  >
                    Registration
                  </button>
                </div>
              </div>
              <div className="float-end">
                  <span>
                    I have already an account{" "}
                    <Link className="text-center ms-2 h6" to="/login">
                      Sign In
                    </Link>
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
