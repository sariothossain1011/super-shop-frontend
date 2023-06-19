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

  if (cart !== null && Array.isArray(cart) && cart.length > 0 ) {
    return (
      <Fragment>
        <div className="container-fluid bg-lightgray pt-4 mt-5">
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
                            <div className="col-md-5">
                              <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <span className="card-text">
                                  {item.description}
                                </span>
                                <p className="card-text">
                                  {" "}
                                  Price : {item.price}
                                </p>
                                <span className="card-text"></span>
                              </div>
                            </div>
                            <div className="col-md-3 mt-3">
                              <button
                                className="btn btn-success"
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
                    <div className="p-5">
                      <h2>Empty Carts Section</h2>
                    </div>
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
  } else {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2>Now here not data</h2>
        <div className="text-center m-2">
          <Link to="/" className=" btn btn-success">
            Shopping Continue
          </Link>
        </div>
      </div>
    );
  }
};

export default Cart;
