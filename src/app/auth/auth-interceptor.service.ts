import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),  // To ensure that we only take the user once and then unsubscribe
      exhaustMap(user => { // To switch from the user observable to the http observable
        if (!user) { return next.handle(req); } // If there is no user, we don't need to modify the request
        const modifiedRequest = req.clone({params: req.params.set('auth', user.token)});
        return next.handle(modifiedRequest);
      })
    );
  }
}
