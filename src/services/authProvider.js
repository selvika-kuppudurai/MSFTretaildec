
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configurations
const config = {
    auth: {
        // authority: 'https://msftinstoreexperience.b2clogin.com/msftinstoreexperience.onmicrosoft.com/B2C_1_signup_signin',
        instanceof: 'https://msftinstoreexperience.b2clogin.com/',
        LoginType: 'B2C_1_signup_signin',
        clientId: '40dc7e8d-9e77-462d-bb4f-44d32ed0a73e',
        redirectUri: 'http://localhost:3000'
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: [
        'https://msftinstoreexperience.onmicrosoft.com/tasks-api/tasks.read'
    ]
}

// Options
const options = {
    loginType: LoginType.Popup,
    // tokenRefreshUri: window.location.origin + '/auth.html'
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)