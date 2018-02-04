import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/infrastructure/authentication.service';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private readonly auth: AuthenticationService, private readonly injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.token}`,
            }
        });
        return next.handle(request).catch(error => this.handleError(error));
    }

    handleError(err: HttpErrorResponse) : Observable<any> {
        let errorMsg;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        if (err.status === 401) {
            this.injector.get(AuthenticationService).logout();
        }
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }
}