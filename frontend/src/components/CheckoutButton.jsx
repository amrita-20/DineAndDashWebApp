import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import UserProfileForm from "./UserProfileForm";
import { useGetUserDetails } from "../services/UserServices";
import Modal from "./Modal";

const CheckoutButton = ({ onCheckout, disabled, isLoading }) => {
  const [modal, setModal] = useState(false);

  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { userDetails, isLoading: isGetUserLoading } = useGetUserDetails();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <button className="button-checkout" type="button" onClick={onLogin}>
        Log in to check out
      </button>
    );
  }

  if (isAuthLoading || !userDetails || isLoading) {
    return <div>Loading ....</div>;
  }

//   const handleCheckout = () => {
//     onCheckout();
//     setModal(false);
//   }

  return (
    <>
      <button disabled={disabled} className="button-checkou" onClick={() => setModal(true)}>
        Go to checkout
      </button>
      <Modal  
      openModal={modal}
      closeModal={() => setModal(false)}>
        <UserProfileForm
          userDetails={userDetails}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </Modal>
    </>
  );
};

export default CheckoutButton;
