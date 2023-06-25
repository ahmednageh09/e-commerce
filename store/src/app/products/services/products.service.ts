import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient,private snack:MatSnackBar ) {}

  getAllProducts(){
    return this.http.get(`${environment.baseApi}/products`)
    .pipe(
      retry(2),
      catchError(this.handelError)
    )
  }
  getAllCategories(){
    return this.http.get(`${environment.baseApi}/products/categories`)
    .pipe(
      retry(2),
      catchError(this.handelError)
    )
  }
  getProductsByCategory(cat:string){
    return this.http.get(`${environment.baseApi}/products/category/${cat}`)
    .pipe(
      retry(2),
      catchError(this.handelError)
    )
  }

  getProductById(id:any){
    return this.http.get(`${environment.baseApi}/products/${id}`)
  }

  private handelError(error:HttpErrorResponse) {
    if(error.status===0){
      //A client-side or network error occurred
      this.snack.open(`An error ocurred ${error.status}`,'Dismiss');
    }else {
      //The backend returned an unsuccessful response code
      this.snack.open(`Backend returned code ${error.status}`,'Dismiss');
    }
    // Returned an observable with a user-facing error message
    return throwError (()=> new Error('Something Bad Happen, pleasse try again later'))

   }
}
