
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req).pipe( catchError((err) => {
      // Handle the error here
      console.log( err);
      // Optionally, you can throw an error or return a default value
      return throwError(() =>  err);
    })
  );
};
