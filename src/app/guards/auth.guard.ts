import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const AuthGuard: CanActivateFn = (route, state) => {
  
    if (localStorage.getItem('access_token') == '' && localStorage.getItem('access_token') == null) {
      return false;
    }
    return true;
};
