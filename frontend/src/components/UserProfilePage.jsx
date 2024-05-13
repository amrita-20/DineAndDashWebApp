import { useGetUserDetails, useUpdateUserRequest } from "../services/UserServices";
import Error from "./Error";
import Success from "./Success";
import UserProfileForm from "./UserProfileForm";

function UserProfilePage() {
    const { userDetails, isLoading: getLoading, error: getError} = useGetUserDetails();
    const {updateUser, isLoading: updateLoading, isSuccess, error: updateError } = useUpdateUserRequest();
    if(getLoading){
        return <span>Loading ....</span>
    }
    if(!userDetails){
        return<span>Unable to load user details</span>
    }
    const errorMessage = getError || updateError;
    return(
        <>
        <Success isSuccess={isSuccess} />
        <Error errorMessage={errorMessage} />
        <UserProfileForm onSave={updateUser} isLoading={updateLoading} userDetails={userDetails}  />
        </>
        
    )
}

export default UserProfilePage;