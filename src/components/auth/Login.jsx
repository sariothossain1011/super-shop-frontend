import React, { Fragment, useRef, useState } from "react";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import { Link } from "react-router-dom";
import { LoginRequest } from "../../apiRequest/ApiRequest";

const Login = () => {
  // let emailRef,passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // alert(password)

  const SubmitLogin = async () => {
    // let email = emailRef.value;
    // let password = passwordRef.value;
    // alert(email, password);

    if (IsEmail(email)) {
      ErrorToast("Invalid Email Address");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required");
    } else {
      let result = await LoginRequest(email, password);
      if (result) {
        window.location.href = "/";
      }
    }
  };

  return (
    <Fragment>
      <div className="container ">
        <div className="row justify-content-center mt-5">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4 mt-5">
              <div className="card-body">
                <h3>SIGN IN</h3>
                <br />
                <input
                  // ref={(input) => (emailRef = input)}
                  placeholder="enter your e-mail"
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  // ref={(input) => (passwordRef = input)}
                  placeholder="enter your password"
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                  onClick={SubmitLogin}
                  className="btn btn-success w-100 animated "
                >
                  Login
                </button>
                <div className="float-end mt-3">
                  <span>
                    Create a new account{" "}
                    <Link className="text-center ms-3 h6" to="/register">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
