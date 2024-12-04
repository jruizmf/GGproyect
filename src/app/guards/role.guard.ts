import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log(localStorage.getItem('role'))
  if (localStorage.getItem('role') == '' && localStorage.getItem('role') == null) {
    return false;
  } else{
    if (localStorage.getItem('role') == 'Admin') {
      return true;
    } else{
      return false;
    }
  }
  
};
