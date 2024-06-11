

function OrderStatusHeader({ order }) {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);
    
        created.setMinutes(
          created.getMinutes() + order.restaurant.estimatedDeliveryTime
        );
    
        const hours = created.getHours();
        const minutes = created.getMinutes();
    
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${hours}:${paddedMinutes}`;
      };
  return (
    <div>
      
    </div>
  )
}

export default OrderStatusHeader;
