import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl ="https://localhost:44365/api/aplicante/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('Ocurrio un error: ', error.error.message);
    } else {
      console.error(
        `Error devuelto del backend ${error.status},` + 
        `body was: ${error.error}`);
    }
    return throwError('Algo mal ocurrio, intente de nuevo luego.');
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }
  getDataUser(): Observable<any>{
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError));
    }
   
    
}




