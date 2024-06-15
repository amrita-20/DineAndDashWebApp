import { ORDER_STATUS } from "./OrderStatus";
import { useState, useEffect } from "react";
import { useUpdateOrderStatus } from "../services/OrderServices";

function OrderCardItems({ order }) {
  const [status, setStatus] = useState(order.status);
  const { updateOrderStatus, isLoading } = useUpdateOrderStatus();

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (e) => {
    // Here is the problem
    await updateOrderStatus({
      orderId: order._id,
      status: e.target.value,
    });
    setStatus(e.target.value);
  };

  const getExpectedDelivery = (order) => {
    const created = new Date(order.createdAt);

    created.setMinutes(created.getMinutes());

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <li key={order._id} className="card-order">
      <div className="order-header-info">
        <span className="order-date">
          Customer Name : {order.deliveryDetails.name}
        </span>
        <span className="order-date">Time : {getExpectedDelivery(order)}</span>
        <span className="order-id">Order # {order._id}</span>
        <span>Delivering to: </span>
        <span className="order-username">{order.deliveryDetails.name}</span>
        {/* <span className="order-info">{order.deliveryDetails.address.street}</span>
              <span className="order-info">{order.deliveryDetails.address.city}</span>
              <span className="order-info">{order.deliveryDetails.address.state}</span> */}
      </div>
      <ul className="item-details">
        {order.cartItems.map((dish) => (
          <li key={dish.dishId} className="card-item-detail">
            <div className="item-image-container">
              <img className="item-image" src={dish.image} alt="" />
            </div>
            <div className="item-text">
              <span className="item-name">{dish.name}</span>
            </div>
            <span className="item-price">{dish.price}</span>
            <span className="item-quantity">{dish.quantity}</span>
            <span className="item-subtotal">
              {(dish.quantity * dish.price).toFixed(2)}
            </span>
          </li>
        ))}
        <label htmlFor="status">What is the status of this order?</label>
        <select
          id="status"
          value={status}
          disabled={isLoading}
          onChange={(e) => handleStatusChange(e)}
        >
          {ORDER_STATUS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </ul>
    </li>
  );
}

export default OrderCardItems;
