import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  constructor(private http:HttpClient, private snack:MatSnackBar) {}
  ngOnInit(): void {
    this.getAllCart()
  }

  getAllCart(param?:any) {
    let params = new HttpParams()
    params = params.append("startDate",param?.start).append("endDate",param?.end)
    return this.http.get(environment.baseApi + "carts" , {params})
  }

  deleteCart(id:number) {
    return this.http.delete(environment.baseApi + "carts/" + id)
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
