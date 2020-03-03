import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user';
import { environment } from '../../environments/environment'

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    signup(user: User) {
        return this.http.post(`${environment.apiUrl}/signup`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}