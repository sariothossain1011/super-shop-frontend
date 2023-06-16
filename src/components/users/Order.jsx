import React, { useEffect, useState } from "react";
import { GetOrderRequest } from "../../apiRequest/ApiRequest";
import moment from "moment";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrder] = useState();
  //   console.log(orders);

  useEffect(() => {
    (async () => {
      const res = await GetOrderRequest();
      setOrder(res);
    })();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h2 bg-light text-center">Orders Information</div>
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
                          <th scope="col">Buyer</th>
                          <th scope="col">Ordered</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{item?.status}</td>
                          <td>{item?.buyer?.name}</td>
                          <td>{moment(item?.createdAt).fromNow()}</td>
                          <td>
                            {item?.payment?.success ? "Success" : "Failed"}
                          </td>
                          <td>{item?.products?.length} products</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <div className="position-absolute top-50 start-50 translate-middle">
                <h1>Now here not data</h1>
                <div className="text-center m-2"><Link to="/" className=" btn btn-success">Shopping Continue</Link></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
