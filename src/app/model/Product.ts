export interface Product{
  id :String;
  name:String;
  price:number;
  promotion:boolean;
  selected:boolean;
}
//pour la pagination
export interface PageProduct{
  products:Product[];
  page:number;
  size:number;
  totalPages:number;
}
