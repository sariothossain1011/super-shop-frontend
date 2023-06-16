import React, { Fragment, useEffect, useState } from "react";

import { BASE_URL } from "../../helper/config";
import { useCart } from "../context/CartContext";
import { setCartData } from "../../helper/SessionHelper";
import PaymentCard from "./PaymentCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useCart();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    setCartData(myCart);
  };

  if(cart !== 0){
    return (
      <Fragment>
        <div className="container-fluid bg-lightgray">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-7">
                  {cart !== null && Array.isArray(cart) && cart.length > 0 ? (
                    cart.map((item, i) => {
                      return (
                        <div className="card my-5 mx-5">
                          <div className="row g-0">
                            <div className="col-md-4">
                              <img
                                src={`${BASE_URL}/productPhoto/${item._id}`}
                                alt={item.name}
                                className="img-fluid rounded-start w-100 h-100"
                              />
                            </div>
                            <div className="col-md-6">
                              <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <span className="card-text">
                                  {item.description}
                                </span>
                                <span className="card-text">{item.price}</span>
                                <span className="card-text">{item.quantity}</span>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <button
                                className="btn btn-warning"
                                onClick={() => removeFromCart(item._id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No items in the cart.</div>
                  )}
                </div>
                <div className="col-md-5">
                  <PaymentCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }else{
    <div className="position-absolute top-50 start-50 translate-middle">
                <h1>Now here not data</h1>
                <div className="text-center m-2"><Link to="/" className=" btn btn-success">Shopping Continue</Link></div>
              </div>
  }
};

export default Cart;
