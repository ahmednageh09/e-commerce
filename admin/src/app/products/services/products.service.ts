import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  getAllProducts() {
    return this.http.get(`${environment.baseApi}products`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getAllCategories() {
    return this.http.get(`${environment.baseApi}products/categories`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProductsByCategory(cat: string) {
    return this.http.get(`${environment.baseApi}products/categories/${cat}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProductById(id: any) {
    return this.http.get(`${environment.baseApi}products/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createProduct(prd: any) {
    return this.http.post(environment.baseApi + 'products', prd)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred
      this.snack.open(`An error occurred ${error.status}`, 'Dismiss');
    } else {
      // The backend returned an unsuccessful response code
      this.snack.open(`Backend returned code ${error.status}`, 'Dismiss');
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something Bad Happened, please try again later'));
  }
}
