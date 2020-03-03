import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }   from '../../environments/environment'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { email: username, password: password },
        {
            headers: {
              'Content-Type': 'application/json'
        }
    })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('name',user.name);
                    localStorage.setItem('email',user.email);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('token');

    }
}