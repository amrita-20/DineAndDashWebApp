import { useState } from "react";

import Error from "./Error";

import "../css/UserProfileForm.css";

function UserProfileForm({onSave, isLoading, userDetails}) {
    const lastIdx = userDetails?.addresses.length-1;
    const [errorMessage, setErrorMessage] = useState('');
    const [info, setInfo] = useState({
        email: userDetails?.email || "",
        phoneNumber: userDetails?.phone || "",
        name: userDetails?.name || "",
        street: userDetails?.addresses[lastIdx]?.street || "",
        city: userDetails?.addresses[lastIdx]?.city || "",
        state: userDetails?.addresses[lastIdx]?.state || "",
        country: userDetails?.addresses[lastIdx]?.country || "",
        postCode: userDetails?.addresses[lastIdx]?.postCode || ""
    });

  function handleChange(e) {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    for (const key in info) {
      if (!info[key]) {
        setErrorMessage("Invalid data")
        return;
      }
    }
    const address = {
        street: info.street,
        city: info.city,
        country: info.country,
        state: info.state,
        postCode: info.postCode
      }
      const formData = {
        name: info.name,
        phoneNumber: info.phoneNumber,
        address
      }
    onSave(formData);
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="form-register">
          <h2 className="form-header">User Profile Form</h2>
          <p>View and change your profile information here</p>
          <form className="form-profile" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-container">
              <label htmlFor="email" />
              Email:
              <input
                id="email"
                className="email"
                type="text"
                name="email"
                disabled
                value={info.email}
                onChange={(e) => handleChange(e)}
                
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="name" />
              Name:
              <input
                id="name"
                type="text"
                name="name"
                value={info.name}
                onChange={(e) => handleChange(e)}
                
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="phone" />
              Phone:
              <input
                id="phone"
                type="text"
                name="phoneNumber"
                value={info.phoneNumber}
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="street" />
              Street Address:
              <input
                id="street"
                type="text"
                name="street"
                value={info.street}
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="city" />
              City:
              <input
                id="city"
                type="text"
                name="city"
                value={info.city}
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="state" />
              State:
              <input
                id="state"
                type="text"
                name="state"
                value={info.state}
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="country" />
              Country:
              <input
                id="country"
                type="text"
                name="country"
                value={info.country}
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{errorMessage}</span>
            </div>
            <div className="form-container">
              <label htmlFor="postCode" />
              Zip Code:
              <input
                id="postCode"
                type="text"
                name="postCode"
                value={info.postCode}
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{errorMessage}</span>
            </div>
           
            <button className="button-update" type="submit">
              Submit
            </button>
            {/* <Error errorMessage={{errorMessage}} /> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default UserProfileForm;
