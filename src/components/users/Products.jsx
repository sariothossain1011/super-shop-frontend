import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ProductsRequest } from "../../apiRequest/ApiRequest";
import { BASE_URL } from "../../helper/config";
import { SuccessToast } from "../../helper/FormHelper";
import { setCartData } from "../../helper/SessionHelper";
import { useCart } from "../context/CartContext";

const Products = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();


  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await ProductsRequest();
      setProducts(res);
    })();
  }, []);
  return (
    <Fragment>

    <div className="row">
      <div className="col-md-12">
        <div className="container-fluid py-4 ">
          <div className="row  d-flex justify-content-center align-content-center">
            {products ? (
              products.map((item, i) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12 p-3">
                    <div className="card p-3">
                      <img
                        className="card-img-top"
                        src={`${BASE_URL}/productPhoto/${item._id}`}
                        alt={item.name}
                      />
                      <div className="my-2 d-flex justify-content-between">
                        <h4 className="card-link">{item.title}</h4>
                        <h5 className="card-link">{item.price}</h5>
                      </div>
                      <div className="">
                        <p>{item.description.slice(0, 30)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <NavLink
                          to={`/product/${item._id}`}
                          className=" btn btn-success"
                        >
                          View Details
                        </NavLink>
                        {item.quantity > 0 ? (
                          <button
                          // onClick={() => {
                          //   setCart([...cart, item]);
                          //   setCartData([...cart, item])
                          //   SuccessToast("Added to cart");
                          // }}
                          onClick={() => {
                            if (Array.isArray(cart)) {
                              setCart([...cart, item]);
                              setCartData([...cart, item]);
                              SuccessToast("Added to cart");
                            } else {
                              setCart([item]);
                              setCartData([item]);
                              SuccessToast("Added to cart");
                            }}}
                            className="btn btn-success"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <button className="btn btn-success">
                            Stock Out
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  );
};

export default Products;
