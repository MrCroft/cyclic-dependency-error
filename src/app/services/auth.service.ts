import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient
    ) { }


    getToken() {
        return 'some-token';
    }

    logOut() {
        console.log('-- DELETING USER COOKIE');
    }
}
