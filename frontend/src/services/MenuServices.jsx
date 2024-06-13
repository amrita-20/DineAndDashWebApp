import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMenuDetails = () => {
    const getMenuDetails = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/menu`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch menu details');
        }
        return response.json();
    }

    const {data: menuDetails, isLoading, error} = useQuery("fetchMenuDetails", getMenuDetails);
    return {
        menuDetails,
        isLoading,
        error
    }
}