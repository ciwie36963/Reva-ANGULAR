import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseUrlInterceptor } from "./base-url.interceptors";

export const basehttpInterceptorProviders = [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true
    }
   ]; 