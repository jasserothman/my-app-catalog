import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/Product";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products! :Array<Product>;
productUp!:Product;
  constructor() {
    this.products=[];
    for (let i = 0; i < 10; i++) {
      this.products.push({id:UUID.UUID(),name:"pc Model P11"+Math.floor(Math.random()*100),price:4500+(i*100),promotion:false,selected:false},
      {id:UUID.UUID(),name:"tablet Model TB20"+Math.floor(Math.random()*100),price:1010+(i*12),promotion:true,selected:false},
        {id:UUID.UUID(),name:"smartphone Model S0"+Math.floor(Math.random()*100),price:600+(i*52),promotion:false,selected:false}
        )
    }
  }


  getProducts():Observable<Array<Product>>{
    let rnd=Math.random();
    if(rnd<0.1)return throwError(()=>{new Error("internet connexion failed ")});
else return of([...this.products]);
  }

  getPageProduct(page :number,size:number):Observable<PageProduct>{
    let index=page*size;
    let totalPages=~~(this.products.length/size);
    if(this.products.length % size !=0){
      totalPages++;
    }
    let productPage= this.products.slice(index,index+size);
return of({page:page,size:size,totalPages:totalPages,products:productPage});
  }

public deleteProductFromBackend(id:String):Observable<boolean>{
  this.products=this.products.filter(p=>p.id!=id);
  return of(true);
  }
  setPromotion(id:String):Observable<boolean>{
    let prod= this.products.find(p=>p.id==id);
   if(prod !=undefined){
     prod.promotion=!prod.promotion;
     return of(prod.promotion);
   }else return of(false);

  }

  // SearchProduct(keyword:any) :Observable<Product[]>{
  //   let produc = this.products.filter(p=>p.name.includes(keyword));
  //   return of(produc);
  //
  // }
  SearchPageProduct(keyword:any,page:number,size:number) :Observable<PageProduct>{

    let produc = this.products.filter(p=>p.name.includes(keyword));
    let index=page*size;

    let totalPages=~~(produc.length/size);
    if(produc.length % size !=0)
      totalPages++;

    let productSearchPage=produc.slice(index,index+size);

    return of({page:page,size:size,totalPages:totalPages,products:productSearchPage});

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
  addProduct(product :Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }
  findProductById(id:String):Observable<Product>{
    let resultPro=this.products.find(p=>p.id==id);
    if(resultPro!=undefined){
      this.productUp=resultPro;
      return of (resultPro);
    }
    else return throwError(()=>{new Error('not found')})

  }

  getAllProductInPromtion(page:number,size:number) :Observable<PageProduct>{

    let produc = this.products.filter(p=>p.promotion==true);
    let index=page*size;

    let totalPages=~~(produc.length/size);
    if(produc.length % size !=0)
      totalPages++;

    let productPromoPage=produc.slice(index,index+size);

    return of({page:page,size:size,totalPages:totalPages,products:productPromoPage});

  }

  updateProduct(product:Product):Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product)
  }

}


