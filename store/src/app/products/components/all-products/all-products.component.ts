import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/i-product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: any[] = [];
  selectedCat: string = "";
  loading: boolean = false;
  cartProducts: any[] = [];
  page: any = 1;
  total: any;

  constructor(private service: ProductsService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    return this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  getCategories() {
    this.loading = true;
    return this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
    });
  }

  filterCategory(event: any) {
    let value = event.target.value;
    value == "all" ? this.getProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(prdCat: string) {
    this.service.getProductsByCategory(prdCat).subscribe((res: any) => {
      this.products = res;
    });
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item) => item.item.id == event.item.id);
      if (exist) {
        this.toastr.info("Product Already Added", "Info");
      }else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
        this.toastr.success("Product Added Successfully", "Success");
      }
    }
    else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
        this.toastr.success("Product Added Successfully", "Success");
      }
    }

}
