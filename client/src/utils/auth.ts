import { type JwtPayload, jwtDecode } from 'jwt-decode';

interface ExtendedJwt extends JwtPayload {
  data: {
    username: string;
    email: string;
    userId: string;
  };
}

class AuthService {
  // Get the profile of the user from the JWT token
  getProfile() {
    return jwtDecode<ExtendedJwt>(this.getToken());
  }

  // Check if the user is logged in by checking if the token is available and not expired
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // If the decoded token contains an expiration date, check if it's expired
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  // Get the token from localStorage (or return an empty string if it's not available)
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Login the user by saving the token in localStorage and redirecting to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    // window.location.assign('/');
  }

  // Logout the user by removing the token from localStorage and redirecting to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/'); // You can change this to navigate programmatically using your router
  }
}

export default new AuthService();