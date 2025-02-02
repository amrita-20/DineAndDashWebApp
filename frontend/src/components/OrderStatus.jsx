import { useGetOrders } from "../services/OrderServices";
import "../css/Order.css";

export const ORDER_STATUS = [
  { label: "Placed", value: "placed", progressValue: 0 },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];

function OrderStatus() {
  const { orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  const getExpectedDelivery = (order) => {
    const created = new Date(order.createdAt);

    created.setMinutes(created.getMinutes());

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = (order) => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <div className="main-wrapper">
      {orders.length > 0 ? (
        <ul className="orders">
          {orders.map((order) => (
            <li key={order._id} className="card-order">
              <div className="order-header-info">
                <p className="order-id">Order # {order._id}</p>
                <p className="order-user">
                  Order Status : {getOrderStatusInfo(order).label}
                </p>
                <p className="order-date">
                  Expected Delivery by : {getExpectedDelivery(order)}
                </p>
                <p>Delivering to: </p>
                <p className="order-username">
                  {order.deliveryDetails.name}
                </p>
                {/* <span className="order-info">{order.deliveryDetails.address.street}</span>
              <span className="order-info">{order.deliveryDetails.address.city}</span>
              <span className="order-info">{order.deliveryDetails.address.state}</span> */}
              </div>
              <ul className="item-details">
                {order.cartItems.map((dish) => (
                  <li key={dish.dishId} className="card-item-detail">
                    <div className="item-image-container">
                      <img className="item-image" src={dish.imagePath} alt="" />
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
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No orders to display</h2>
      )}
    </div>
  );
}

export default OrderStatus;
