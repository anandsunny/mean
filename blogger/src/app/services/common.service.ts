import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  getSingle(table, field, field_value) {
    return this._httpClient.get(`${this._authService.rootUrl}common/${table}/${field}/${field_value}`);
  }
}
