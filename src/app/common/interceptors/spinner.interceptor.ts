import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor (private SpinnerSrvc: SpinnerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.SpinnerSrvc.show();
        return next.handle(req).pipe(
            finalize( () => this.SpinnerSrvc.hide() )
        );
    }
    
}