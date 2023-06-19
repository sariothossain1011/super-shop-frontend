import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../../helper/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import { useCart } from "../context/CartContext";
import {
  getUserDetails,
  removeCartData,
  setUserDetails,
} from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const PaymentCard = () => {
  let addressRef = useRef();

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        };

        if (auth?.token) {
          let token = await axios.get(`${BASE_URL}/braintree/token`, config);
          setClientToken(token?.clientToken);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientToken();
  }, [auth?.token]);

  const updateAddress = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      };

      const address = addressRef.current.value;
      const { data } = await axios.post(
        `${BASE_URL}/updateUser`,
        { address },
        config
      );
      if (data?.error) {
        ErrorToast(data.error);
      } else {
        setAuth({ ...auth, user: data });
        // Local storage update
        let userDetails = getUserDetails();
        userDetails = data.data; // Modify the address field
        setUserDetails(userDetails);
        SuccessToast("Address added");
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
    } catch (error) {
      ErrorToast("Address Add fail");
    }
  };

  const handleBuy = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      };
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(URL, { nonce, cart }, config);
      removeCartData();
      setCart([]);
      SuccessToast("Payment successful");
      navigate("/order");
    } catch (error) {
      ErrorToast("Payment fail");
    }
  };

  const cartTotal = () => {
    let total = 0;
    if (cart !== null && Array.isArray(cart)) {
      cart?.map((item) => {
        total += item.price;
      });
    }
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Fragment>
      <div className="pt-5">
        <h2 className="text-center">Payments Details</h2>
        <hr />
        <div className="mb-3"></div>
        {auth?.user?.address ? (
          <>
            <h6>Delivery address : {auth?.user?.address}</h6>
          </>
        ) : (
          <div></div>
        )}
        <h6>Total : {cartTotal()}</h6>
        <div>
          {auth?.user?.address ? (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={setInstance}
              />

              <button
                onClick={handleBuy}
                className="btn btn-primary col-12 mt-2"
                disabled={!auth?.user || !instance}
              >
                Buy
              </button>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <>
                  <div className="py-2">
                    <input
                      placeholder="Enter Your Address"
                      type="text"
                      ref={addressRef}
                    />
                  </div>

                  <button
                    className="btn btn-outline-warning"
                    onClick={updateAddress}
                  >
                    Add delivery address
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-danger mt-3"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to checkout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentCard;
