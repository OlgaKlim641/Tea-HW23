import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {OrderService} from "../../../shared/services/order.service";
import {ProductType} from "../../../../types/product.type";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<ProductType | undefined> = new Observable<ProductType>();
  constructor(protected readonly productService: ProductService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly orderService: OrderService) { }

  public ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');

        if (productId) {
          return this.productService.getProductById(productId).pipe(
            catchError(error => {
              console.error('Ошибка при получении продукта:', error);
              return of(undefined);
            })
          );
        } else {
          console.error('Product ID is missing.');
          return of(undefined);
        }
      })
    );
  }


 public orderProduct(product: ProductType) {
    this.orderService.selectProduct(product);
    this.router.navigate(['order'])
  }
}

