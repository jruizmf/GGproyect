import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
     const userToken = localStorage.getItem('access_token') || ""; 
     console.log(typeof localStorage.getItem('access_token'))
     console.log(localStorage.getItem('access_token'))
     req.headers.set('Content-Type', 'application/json')
     if ( localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') != null) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`),
      });
   
      return next(modifiedReq);
     } else {
      return next(req);
     }
  
  };
 
 // const token: string = localStorage.getItem('access_token') || "";
