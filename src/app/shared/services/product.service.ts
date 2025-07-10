import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private url: string = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) {
  }


  public getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.url);
  }


  public getProductById(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.url}?id=${id}`);
  }

  public searchProduct(query: string): Observable<ProductType[]> {
    return this.http.get(`${this.url}?search=${query}`).pipe(
      map((response: any) => response as ProductType[])
    );
  }
}
