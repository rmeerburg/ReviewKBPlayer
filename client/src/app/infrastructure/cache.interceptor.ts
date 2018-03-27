import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map, filter, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache: { [name: string]: HttpEvent<any> } = {};
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method !== "GET") {
            return next.handle(request);
        }
        const cachedResponse = this.cache[request.urlWithParams] || null;
        if (cachedResponse) {
            return Observable.of(this.copyHttpResponse(<any>cachedResponse));
        }
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.cache[request.urlWithParams] = this.copyHttpResponse(event);
            }
            return event;
        }));
    }

    private copyHttpResponse(response: HttpResponse<any>) {
        return Object.assign(Object.create(HttpResponse.prototype), JSON.parse(JSON.stringify(response)));
    }

    public invalidateCacheItem(itemPath: string) {
        delete this.cache[`${environment.apiUrl}/${itemPath}`];
    }
}