import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../../helper/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import {
  GetPaymentTokenRequest,
  ProcessPaymentRequest,
} from "../../apiRequest/ApiRequest";
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "../context/CartContext";
import { getCartData, removeCartData } from "../../helper/SessionHelper";
import { Link, useNavigate } from "react-router-dom";

const PaymentCard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [cart, setCart] = useCart();
  // alert(clientToken)

  useEffect(() => {
    (async () => {
      if (auth?.token) {
        // token
        const token = await GetPaymentTokenRequest();
        setClientToken(token?.clientToken);
      }
    })();
  }, [auth?.token]);

  const handleBuy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      await ProcessPaymentRequest(nonce, cart);
      removeCartData();
      setCart([])
      SuccessToast("Payment successful");
      navigate("/order");
    } catch (error) {
      ErrorToast("Payment fail");
    }
  };

  const cartTotal = () => {
    let total = 0;
    if (cart !== null && Array.isArray(cart)) {
      cart.map((item) => {
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
        <h6>Total: {cartTotal()}</h6>
        <div>
          <div className="mt-3">
            {!clientToken || !cart?.length ? (
              <Link to="/login" className="btn btn-success" >login</Link>
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  onClick={handleBuy}
                  className="btn btn-primary col-12 mt-2"
                  disabled={!auth?.user || !instance}
                >
                  Buy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentCard;


// <div 
//               onClick={() =>
//                 navigate("/login", {
//                   state: "/cart",
//                 })
//               }
//               className="btn btn-success" >Login</div>