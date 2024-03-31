import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent  implements OnInit{
  formProduct!:FormGroup;
  constructor(private fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.formProduct=this.fb.group({
      userName:this.fb.control(""),
      password:this.fb.control(""),
      roles:this.fb.control("")
    })
  }

  addNewProduct() {

  }
}
