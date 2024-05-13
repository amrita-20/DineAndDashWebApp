import {Auth0Provider} from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Auth0ProviderWithNav({children}) {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT;
    const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if(!domain || !clientId || !redirectUri){
        throw new Error("Unable to connect to auth");
    }
    const onRedirectCallback = () =>{
        navigate("/auth-callback");
    }
    return(
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience
            }}
            onRedirectCallback={onRedirectCallback}
        >{children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNav;