import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getOrderRequest = async () => {
    const authToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) throw new Error("error fetching orders");

    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchOrderRequest",
    getOrderRequest,
    { refetchInterval: 3000 }
  );

  return {
    orders,
    isLoading,
  };
};

export const useGetAllOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllOrderRequest = async () => {
    const authToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) throw new Error("error fetching orders");

    return response.json();
  };
  const { data: allOrders, isLoading } = useQuery(
    "fetchOrderRequest",
    getAllOrderRequest
  );

  return {
    allOrders,
    isLoading,
  };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionReq = async (checkoutSessionReq) => {
    const authToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionReq),
      }
    );

    if (!response.ok) throw new Error("error creating session request");

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionReq);

  return {
    createCheckoutSession,
    isLoading,
    error,
    reset,
  };
};

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateOrder = async (updateStatusOrderRequest) => {
    const authToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateOrder);

  // if (isSuccess) {
  //   toast.success("Order updated");
  // }

  // if (isError) {
  //   toast.error("Unable to update order");
  //   reset();
  // }

  return { updateOrderStatus, isLoading };
};
