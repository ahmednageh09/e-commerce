import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models/i-product';
import { ProductsService } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products:any = [];
  categories:string[] = [];
  loading:boolean = false;
  base64:any = '';
  form!:FormGroup;
  @ViewChild('modal') modal!:TemplateRef<any>;
  constructor( private service:ProductsService ,
               private build:FormBuilder,
               private dialog:MatDialog,
               private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.build.group({
      title: ['' , [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    this.getProducts();

    this.getCategories();
  }

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
     })
    }

  getCategories() {
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res
     })
  }

  getSelectedCategory(event:any) {
    this.form.get('category')?.setValue(event.target.value)
  }


  getImagePath(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.base64 = reader.result;
       this.form.get('image')?.setValue(this.base64)
    };
  }

  openDialog() {
    this.dialog.open(this.modal ,{
      width: '100%',
    })
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  addProduct() {
    const prd = this.form.value
    this.service.createProduct(prd).subscribe(res => {
      this.snack.open('Added Successfully!',"Dismiss",{duration:1000});
      this.dialog.closeAll();
    })
  }

  update(item:any) {
    this.dialog.open(this.modal ,{
      width: '100%',
    })
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    })
    this.base64 = item.image
  }
}
