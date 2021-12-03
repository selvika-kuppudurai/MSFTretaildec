import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {

    tenant: 'msftinstoreexperience.onmicrosoft.com',
    clientId: '40dc7e8d-9e77-462d-bb4f-44d32ed0a73e',

    endpoints: {
        api: "http://localhost:3000",
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);