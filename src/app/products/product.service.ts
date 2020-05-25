import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class ProductService{

    private productUrl = 'api/products/products.json'
    constructor(private http:HttpClient){

    }

    getProduct(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All : '+JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err:HttpErrorResponse){
        //in a real world app, we may send the server to some remote logging infrastructure
        //instead of just logging it to the console
        let errorMessage='';
        if(err.error instanceof ErrorEvent){
            //a client side or network error occured. handle it accordingly
            errorMessage=`An error occured : ${err.error.message}`;
        }else{
            //the backend returned an unsuccessful response code.
            //the response body may conatain clues as to what went wrong,
            errorMessage=`Server return code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}