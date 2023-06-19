


import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helper/config";
import { useAuth } from "../context/AuthContext";


const Order = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        };

        const res = await axios.get(`${BASE_URL}/getOrders`, config);
        setOrder(res.data["data"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [auth?.token]);

  return (
    <div>
      <div className="container-fluid pt-4 mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h2 bg-light text-center">
              Orders Information
            </div>
            {orders !== null && Array.isArray(orders) && orders.length > 0 ? (
              orders?.map((item, i) => {
                return (
                  <div
                    key={item._id}
                    className="border shadow bg-light rounded-4 mb-5"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">No:</th>
                          <th scope="col">Status</th>
                          <th scope="col" className="hide-div">Buyer</th>
                          <th scope="col" className="hide-div">
                            Ordered
                          </th>
                          <th scope="col">Payment</th>
                          <th scope="col" className="hide-div">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> {i + 1}</td>
                          <td>{item?.status}</td>
                          <td className="hide-div">{item?.buyer?.name}</td>
                          <td className="hide-div">
                            {moment(item?.createdAt).fromNow()}
                          </td>
                          <td>
                            {item?.payment?.success ? "Success" : "Failed"}
                          </td>
                          <td className="hide-div">
                            {item?.products?.length} products
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <div className="position-absolute top-50 start-50 translate-middle">
                <h2>No data available</h2>
                <div className="text-center m-2">
                  <Link to="/" className=" btn btn-success">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
