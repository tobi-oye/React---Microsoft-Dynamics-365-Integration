import decode from 'jwt-decode';
const TOKEN_KEY = 'token';
class TokenService {
  token = sessionStorage.getItem(TOKEN_KEY);

  /* Token deleteage */
  deleteToken() {
    this.token = '';
    sessionStorage.setItem(TOKEN_KEY, '');
  }

  /* Set token. This is only done after signin. */
  setToken(token) {
    this.token = token;
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  getToken() {
    return this.token;
  }
  isTokenExpired = () => {
    if (!this.token) {
      return true;
    }
    const date = this.getTokenExpirationDate();
    /* offsetSeconds  */
    const offsetSeconds = 0;
    if (date === null) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  };
  /** @returns {null|object} - Date of expiration. */
  getTokenExpirationDate = () => {
    if (!this.token) return null;
    const decoded = decode(this.token);
    if (!decoded.exp) {
      return null;
    }
    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  };
}

const TokenServiceInstance = new TokenService();

export default TokenServiceInstance;
