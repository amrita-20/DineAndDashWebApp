import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUserDetails = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getUserDetails = async () => {
        const authToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch user details');
        }
        return response.json();
    }

    const {data: userDetails, isLoading, error} = useQuery("fetchUserDetails", getUserDetails);
    return {
        userDetails,
        isLoading,
        error
    }
}

export const useCreateUserReuest = () => {
    const { getAccessTokenSilently } = useAuth0();

    const userRequest = async(user) => { 
        const authToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if(!response.ok){
            throw new Error("Failed to create user");
        }
    }


    const {mutateAsync: createUser, isLoading, isError, isSuccess} = useMutation(userRequest)

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
};

export const useUpdateUserRequest = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateUserRequest = async (formData) => {
        const authToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/v1/user/profile`, {
            method: "PUt",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if(!response.ok){
            throw new Error("Failed to create user");
        }
        return response.json();
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset,
      } = useMutation(updateUserRequest);

    return {
        updateUser,
        isLoading,
        isSuccess,
        error
    }
}


