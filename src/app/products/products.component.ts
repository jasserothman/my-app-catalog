import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/Product";

import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products!:Array<Product>;
  errMessage!:String;
  searchFormGroup!:FormGroup;
  currentPage:number=0;
  sizePage:number=5;
  totalPages!:number;
  currentAction:String="all";
  allProdS:boolean=false;
  etaSelect:boolean=true;



constructor(public  prodService : ProductService,
            private fb :FormBuilder,
            public authenticateService:AuthenticationService,
            private route:Router) {}

  ngOnInit(): void {
  this.searchFormGroup=this.fb.group({
    keyword :this.fb.control(null),
    selectAll:this.fb.control(false)
  });
this.handleAllProductPage();





  }
  //
  // getAllProduct(){
  //   this.prodService.getProducts().subscribe((data)=>{
  //     this.products=data;
  //   },(err) => {
  //     this.errMessage=err;
  //   })
  // }
  handleAllProductPage(){
    this.searchFormGroup.reset();
    this.currentAction="all";
    this.prodService.getPageProduct(this.currentPage,this.sizePage).subscribe(
    (data)=>{
      this.products=data.products;
      this.totalPages=data.totalPages;
      //console.log("totalpage="+this.totalPages);
    })}





  deleteProduct(p:Product) {
  let conf=confirm("are you sure?");
  if(conf==false) return;
    else {
      this.prodService.deleteProductFromBackend(p.id).subscribe(data=>{
        if(data){   let index=this.products.indexOf(p);
          this.products.splice(index,1);}else this.errMessage="acess denied"

      });

    if (this.currentAction == "all") {
      this.handleAllProductPage();
    }

    if (this.currentAction == "search") {

      this.handleSearchPageProduct();
    }


  }}

  handlePromotion(p :Product) {
 this.prodService.setPromotion(p.id).subscribe(data=>{
   p.promotion=data;
 })
  }

//   handleSearchProduct(){
//   let keyword = this.searchFormGroup.value.keyword;
//   this.prodService.SearchProduct(keyword).subscribe(data=>{
//     this.products=data;
//   })
// }
  handleSearchPageProduct(){
    let keyword = this.searchFormGroup.value.keyword;
    //this.currentPage=0;
    this.currentAction="search";

    this.prodService.SearchPageProduct(keyword,this.currentPage,this.sizePage)
      .subscribe((data)=>{
      this.products=data.products;
      this.totalPages=data.totalPages;
    })
  }

  navigateToPage(i:number) {
    this.currentPage = i;

    if (this.currentAction == "all") {
      this.handleAllProductPage();
    }

    if (this.currentAction == "search") {

      this.handleSearchPageProduct();
    }
    if (this.currentAction == "promo") {

      this.handlePromotionProduct();
    }
  }

  editProduct(p:Product) {
      this.route.navigateByUrl("/admin/edit-product/"+p.id);
    }

handlePromotionProduct(){
  this.currentAction="promo"
this.prodService.getAllProductInPromtion(this.currentPage,this.sizePage).subscribe({
  next:(data)=>{
    this.products=data.products;
    this.totalPages=data.totalPages;
  },
  error:(err)=>{
    console.log(err)
  }
})
}

  selectProduct(p:Product) {
  p.selected=!p.selected;
  }

  checkUncheckAll(evt:any) {
    this.products.forEach((p:any) => p.selected = evt.target.checked)
}




}
