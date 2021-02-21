import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment'

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/users`);
    }

    getById(id) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    signup(user) {
        return this.http.post(`${environment.apiUrl}/signup`, user);
    }

    update(user) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}