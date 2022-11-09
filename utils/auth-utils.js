import { Credentials } from 'realm-web';
import realmApp from '../lib/realm';

export const register = (email, password) => {
    return realmApp.emailPasswordAuth.registerUser({ email, password });
}

export const verifyUser = (tokenId, token) => {
    return realmApp.emailPasswordAuth.confirmUser({
        token,
        tokenId,
    })
}

export const loginUser = (email, password) => {
    return realmApp.logIn(Credentials.emailPassword(email, password));
}

export const getToken = async () => {
    await realmApp.currentUser.refreshAccessToken();
    return realmApp.currentUser.accessToken;
}
