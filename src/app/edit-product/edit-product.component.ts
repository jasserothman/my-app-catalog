import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/Product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  productId!:String;
  product!:any;
  formProduct!:FormGroup;

  constructor(private fb:FormBuilder,private productService :ProductService,private route:Router,
              aRoute:ActivatedRoute) {
    this.productId=aRoute.snapshot.params['id'];

  }

  ngOnInit(): void {

    this.productService.findProductById(this.productId).subscribe({
      next:(data)=>{
      this.product=data;
      },
      error(err){
        console.log(err)
      }
    })
    this.formProduct=this.fb.group({
      name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(this.product.price,[Validators.required,Validators.min(200)]),
      promotion:this.fb.control(this.product.promotion,[Validators.required])
    })
  }

  editProduct() {
    let p=this.formProduct.value;
    this.productService.updateProduct(p).subscribe({
      next:(data)=>{
        alert("product updated sucess")

      },
      error :err => {
        console.log(err)
      }
    })

  }

  getErrorMessage(fildName: string, error: ValidationErrors) {
    console.log(error);
    if(error['required']){
      return fildName +"is required"
    }else if(error['minlength']){
      return fildName+" should have at least"+error['minlength']['requiredLength']+"Characters";
    }else if(error['min']){
      return fildName+" min value should be "+error['min']['min'] ;
    }
    else return "";
  }
}
