import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit{
  id:any;
  loading:boolean = false;
  @Input() data:any={};
  @Output() item = new EventEmitter();
  amount:number = 0;
  addButton:boolean=false;
  constructor(private route:ActivatedRoute,
             private product:ProductsService,
             private toastr:ToastrService){
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
    },error=>{
      this.loading = false;
      this.toastr.error("Product Not Found", "Error");
    }
    )
  }

}
