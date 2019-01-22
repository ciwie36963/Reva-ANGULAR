import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import { UtilsService } from '../services/utils.service';
import { AccessData } from './access-data';
import { Credential } from './credential';
import { User } from '../models/user';
import { Router } from '@angular/router';

function parseJwt(token) {
	if (!token) {
	  return null;
	}
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	return JSON.parse(window.atob(base64));
  }

@Injectable()
export class AuthenticationService implements AuthService {
	  private readonly _tokenKey = 'currentUser';
  private readonly _url = '/API/users';
  private _user$: BehaviorSubject<User>;
  private _username$ : BehaviorSubject<String>;
  public redirectUrl: string;

	API_URL = '/users';
	API_ENDPOINT_LOGIN = '/login';
	API_ENDPOINT_REFRESH = '/refresh';
	API_ENDPOINT_REGISTER = '/register';

	public onCredentialUpdated$: Subject<AccessData>;

	constructor(
		private http: HttpClient,
		private tokenStorage: TokenStorage,
		private util: UtilsService
	) {
	
		this.onCredentialUpdated$ = new Subject();
		let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
		
		if (parsedToken) {
		  const expires =
			new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
		  if (expires) {
			localStorage.removeItem(this._tokenKey);
			parsedToken = null;
		  }
		}
		this._user$ = new BehaviorSubject<User>(
			parsedToken && new User(parsedToken._id, parsedToken.name, parsedToken.email, parsedToken.role)
		  );
		this._username$ = new BehaviorSubject<String>(
		  parsedToken && parsedToken.username
		);
	}

	/**
	 * Check, if user already authorized.
	 * @description Should return Observable with true or false values
	 * @returns {Observable<boolean>}
	 * @memberOf AuthService
	 */
	public isAuthorized(): Observable<boolean> {
		
		return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
	}

	public getUserStartPage(): String{
	
		let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
		let route = "";
		
		 switch(parsedToken.role){
			 case "TEACHER":
			 	route += parsedToken.role.toLowerCase() + "/list";
			 break;
			 case "ERGO":
			 route += "shared" + "/list";
			 break;
			 case "ADMIN":
			 route += parsedToken.role.toLowerCase() + "/exposantenbeheren";
			 break;
		 }
		 return route;
	}
	/**
	 * Get access token
	 * @description Should return access token in Observable from e.g. localStorage
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {
		return this.tokenStorage.getAccessToken();
	}

	/**
	 * Get user roles
	 * @returns {Observable<any>}
	 */
	public getUserRoles(): Observable<any> {
		return this.tokenStorage.getUserRoles();
	}

	/**
	 * Function, that should perform refresh token verifyTokenRequest
	 * @description Should be successfully completed so interceptor
	 * can execute pending requests or retry original one
	 * @returns {Observable<any>}
	 */
	public refreshToken(): Observable<AccessData> {
		return this.tokenStorage.getRefreshToken().pipe(
			switchMap((refreshToken: string) => {
				return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_REFRESH + '?' + this.util.urlParam(refreshToken));
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(err => {
				this.logout();
				return throwError(err);
			})
		);
	}

	/**
	 * Function, checks response of failed request to determine,
	 * whether token be refreshed or not.
	 * @description Essentialy checks status
	 * @param {Response} response
	 * @returns {boolean}
	 */
	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		return response.status === 401;
	}

	/**
	 * Verify that outgoing request is refresh-token,
	 * so interceptor won't intercept this request
	 * @param {string} url
	 * @returns {boolean}
	 */
	public verifyTokenRequest(url: string): boolean {
		return url.endsWith(this.API_ENDPOINT_REFRESH);
	}

	/**
	 * Submit login request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public login(credential: Credential): Observable<any> {
		// Expecting response from API
		// {"id":1,"username":"admin","password":"demo","email":"admin@demo.com","accessToken":"access-token-0.022563452858263444","refreshToken":"access-token-0.9348573301432961","roles":["ADMIN"],"pic":"./assets/app/media/img/users/user4.jpg","fullname":"Mark Andre"}
		let username= credential.email;
		let password = credential.password;
		return this.http.post(`${this._url}/login`, { username, password }).pipe(
			map((res: any) => {
			  const token = res.token;
			  if (token) {
				localStorage.setItem(this._tokenKey, token);
				this._user$.next(new User(res.user.id, res.user.name, res.user.email, res.user.role));
				this._username$.next(username);
				
				return true;
			  } else {
				return false;
			  }
			})
		  );
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return from(result);
		};
	}

	/**
	 * Logout
	 */
	public logout() {
		if (this.user$.getValue()) {
		  localStorage.removeItem(this._tokenKey);
		  setTimeout(() => {
			this._user$.next(null);
			this._username$.next(null);
		  });
		}
	  }

	/**
	 * Save access data in the storage
	 * @private
	 * @param {AccessData} data
	 */
	private saveAccessData(accessData: AccessData) {
	
		if (typeof accessData !== 'undefined') {
			this.tokenStorage
				.setAccessToken(accessData.accessToken)
				.setRefreshToken(accessData.refreshToken)
				.setUserRoles(accessData.roles);
			this.onCredentialUpdated$.next(accessData);
		}
	}

	/**
	 * Submit registration request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public register(credential: Credential): Observable<any> {
		// dummy token creation
		let username = credential.email;
		let password = credential.password;
		let name = credential.fullname;
		let regcode = credential.regcode
		return this.http.post(`${this._url}/register`, { username, password, name, regcode }).pipe(
			map((res: any) => {
			  const token = res.token;
			  if (token) {
				localStorage.setItem(this._tokenKey, token);
				this._user$.next(new User(res.user.id, res.user.name, res.user.email,res.user.role));
				this._username$.next(username);
				return true;
			  } else {
				return false;
			  }
			})
		  );
	}
	
	/**
	 * Submit forgot password request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public requestPassword(credential: Credential): Observable<any> {
		return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
			.pipe(catchError(this.handleError('forgot-password', []))
		);
	}
	get user$() {
		return this._user$;
	}
	get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

	get expoDate(): Observable<any> {


		return this.http.get(`${this._url}/expodate`).pipe(map((res: any)=> {
				const date = res.expoDate;
				return date;				
		}));
	}
}
