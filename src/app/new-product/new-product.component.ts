import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/Product";
import {Router} from "@angular/router";
import {throwError} from "rxjs";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent  implements OnInit{
  formProduct!:FormGroup;
  constructor(private fb:FormBuilder,public productService :ProductService,private route:Router) {

  }

  ngOnInit(): void {
    this.formProduct=this.fb.group({
      name:this.fb.control("",[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(0,[Validators.required,Validators.min(200)]),
      promotion:this.fb.control(false,[Validators.required])
    })
  }

  addNewProduct() {
    let p=this.formProduct.value;
    this.productService.addProduct(p).subscribe({
      next:(data)=>{
      alert("product added sucess")
        this.formProduct.reset();
    //this.route.navigateByUrl("/admin/products")
      },
      error :err => {
        console.log(err)
      }
    })

  }


}
