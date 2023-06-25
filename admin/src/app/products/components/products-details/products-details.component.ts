import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit{
  id:any;
  data:any={};
  loading:boolean = false;
  constructor(private route:ActivatedRoute, private product:ProductsService){
    this.id = this.route.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.loading = true;
    this.product.getProductById(this.id).subscribe(res=>{
      this.data = res;
      this.loading = false;
    })
  }
}
