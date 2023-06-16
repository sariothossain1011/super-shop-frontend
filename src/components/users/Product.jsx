import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductRequest } from "../../apiRequest/ApiRequest";
import { BASE_URL } from "../../helper/config";
import { setCartData } from "../../helper/SessionHelper";
import { SuccessToast } from "../../helper/FormHelper";

const Product = () => {
  const params = useParams();
  const productId = JSON.stringify(params.id);
  const id = JSON.parse(productId);
  const [product, setProduct] = useState({});

  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
    setCartData([...cart,item]);
    SuccessToast("Added to cart");
  };

  useEffect(() => {
    (async () => {
      const res = await ProductRequest(id);
      setProduct(res);
    })();
  }, []);

  return (
    <Fragment>
      <div className="">
        <div className="card my-5 mx-5">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`${BASE_URL}/productPhoto/${product._id}`}
                alt={product.name}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price}</p>
                <p className="card-text">{product.quantity}</p>
                {product.quantity > 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-success"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button className="btn btn-success">Stock Out</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
