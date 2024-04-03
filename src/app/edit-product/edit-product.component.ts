import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  formProduct!:FormGroup;
  constructor(private fb:FormBuilder,private productService :ProductService,private route:Router) {

  }

  ngOnInit(): void {
    this.formProduct=this.fb.group({
      name:this.fb.control(this.productService.productUp.name,[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(this.productService.productUp.price,[Validators.required,Validators.min(200)]),
      promotion:this.fb.control(this.productService.productUp.promotion,[Validators.required])
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
