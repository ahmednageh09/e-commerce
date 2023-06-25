import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts:any[] = [];
  total:any=0;
  success:boolean = false;

  constructor(private service:CartService){}


  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
  }

  addAmount(index:number) {
    this.cartProducts[index].quantity ++;
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }

  minsAmount(index:number) {
    this.cartProducts[index].quantity --;
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }

  detectChange() {
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }

  deletProduct(index: number) {
    this.cartProducts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }


  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.removeItem("cart");
  }

  order() {
    let products = this.cartProducts.map(item => {
      return { productId: item.item.id, quantity: item.quantity };
    });

    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    };

    this.service.createNewCart(Model).subscribe(res => {
      this.success = true;
    });
  }

}
