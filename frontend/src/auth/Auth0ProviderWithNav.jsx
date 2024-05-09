import {Auth0Provider} from "@auth0/auth0-react";
function Auth0ProviderWithNav({children}) {
    const domain = import.meta.env.AUTH0_DOMAIN;
    const clientId = import.meta.env.AUTH0_CLIENT;
    const redirectUri = import.meta.env.AUTH0_REDIRECT_URL;


    if(!domain || !clientId || !redirectUri){
        throw new Error("Unable to connect to auth");
    }
    const onRedirectCallback = (appstate, user) =>{
        console.log("user data", user);
    }
    return(
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri
            }}
            onRedirectCallback={onRedirectCallback}
        >{children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNav;