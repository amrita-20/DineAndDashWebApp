import { MESSAGES } from "../constant";

import "../css/UserProfileForm.css";

function Error({ errorMessage }) {
  const message = MESSAGES[errorMessage] || MESSAGES.default;
  
  return (
    <p className="error-message">
        {errorMessage && message}
    </p>
  );
}

export default Error;
