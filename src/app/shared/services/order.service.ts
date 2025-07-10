import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {OrderFormType} from "../../../types/orderForm.type";
import {OrderResponseType} from "../../../types/orderResponse.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'https://testologia.ru/order-tea';
  private selectedProductSource = new BehaviorSubject<ProductType>({
    "id": 0,
    "image": '',
    "title": '',
    "price": 0,
    "description": ''
  });
  public selectedProduct$ = this.selectedProductSource.asObservable();

  public selectProduct(product: ProductType) {
    this.selectedProductSource.next(product);
  }

  constructor(private http: HttpClient) {
  }

  public orderBuy(data: OrderFormType): Observable<OrderResponseType> {
    return this.http.post<OrderResponseType>(this.url, data);
  }
}

