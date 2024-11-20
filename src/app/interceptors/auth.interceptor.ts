import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string = localStorage.getItem('access_token') || "";
  console.log("token")
  console.log(token)
  let request = req;

  if (token) {
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${ token }`
      }
    });
  }

  return next(request);
};
