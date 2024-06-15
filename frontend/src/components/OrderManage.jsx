import { useGetAllOrders } from "../services/OrderServices";
import OrderCardItems from "./OrderCardItems";

import "../css/Order.css";

function OrderManage() {
  const { allOrders, isLoading } = useGetAllOrders();

  if (isLoading) {
    return <div>Loading.....</div>;
  }
  return (
    <div className="main-wrapper">
      {allOrders.length > 0 ? (
        <ul className="orders">
          {allOrders.map((order) => (
            <OrderCardItems key={order._id} order={order} />
          ))}
        </ul>
      ) : (
        <h2>No orders to display</h2>
      )}
    </div>
  );
}

export default OrderManage;
