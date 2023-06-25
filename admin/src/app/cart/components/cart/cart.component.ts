import { Component, OnInit, ViewChild , TemplateRef} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/products/services/products.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  carts:any[] = [];
  products:any[] =[];
  total = 0;
  form!:FormGroup;
  loading:boolean=false;
  @ViewChild('modal') modal!:TemplateRef<any>;
  details:any;
  constructor(private service:CartService,
             private build:FormBuilder,
             private snackBar:MatSnackBar,
             private dialog:MatDialog,
             private productService:ProductsService) {}
  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: ['']
    })
    this.getAllCarts();
  }


  getAllCarts() {
    this.service.getAllCart().subscribe((res:any)=> {
      this.carts = res;
    })
  }

  applyFilter() {
    let date = this.form.value;
    this.service.getAllCart(date).subscribe((res:any)=> {
      this.carts = res;
  })
}

deleteCart(id: number) {
  const snackBarRef = this.snackBar.open('Are you sure you want to delete this item?', 'DELETE');

  snackBarRef.onAction().subscribe(() => {
    this.service.deleteCart(id).subscribe(() => {
      this.getAllCarts();
      this.openSnackBar('Item Deleted', 'DISMISS');
    });
  });
}

openSnackBar(message: string, action: string) {
   this.snackBar.open(message, action, {
    duration: 1000
  });
}

view(index:number) {
   this.dialog.open(this.modal, {
    width: '100%',
  });
  this.products = [];
  this.details = this.carts[index];
  for(let x in this.details.products) {
    this.productService.getProductById(this.details.products[x].productId).subscribe(res =>
      this.products.push({item: res, quantity: this.details.products[x].quantity}))
  }

}
close() {
  this.dialog.closeAll()
}
}
