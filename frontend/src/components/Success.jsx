import "../css/UserProfileForm.css";

function Success ({ isSuccess }) {
    const message = isSuccess ? 'Successfully updated the information' : '';
    return(
        <p className="success-message">{message}</p>
    )
}

export default Success;