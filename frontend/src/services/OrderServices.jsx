import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getOrderRequest = async () => {
        const authToken = await getAccessTokenSilently();
        const response =  fetch(`${API_BASE_URL}/api/order`, {
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        });

        if(!response.ok)
            throw new Error("error fetching orders");

        return response.json();
    }
}

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createCheckoutSessionReq = async (checkoutSessionReq) => {
        const authToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionReq)
        });

        if(!response.ok)
            throw new Error("error creating session request");
        
        return response.json();
    }

    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionReq);

    return {
        createCheckoutSession,
        isLoading,
        error,
        reset
    }
}