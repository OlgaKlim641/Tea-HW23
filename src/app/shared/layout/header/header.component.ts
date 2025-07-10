import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  query: string = '';
  products: ProductType[] = [];
  catalogTitle: string = 'Наши чайные коллекции';
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    protected readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getProducts(): void {
    this.isLoading = true;
    this.subscription.add(
      this.productService.getProducts().subscribe({
        next: (value) => {
          this.products = value;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      })
    );
  }

  learnMore(product: ProductType): void {
    this.router.navigate(['/product', product.id]);
  }

  onSearch(): void {
    if (this.query && this.query.trim() !== '') {
      this.isLoading = true;
      this.subscription.add(
        this.productService.searchProduct(this.query).subscribe({
          next: (result) => {
            this.products = result;
            this.isLoading = false;
            if (this.products.length === 1) {
              // Переход на страницу найденного продукта
              this.learnMore(this.products[0]);
            } else if (this.products.length > 1) {
              this.catalogTitle = 'Результаты поиска по запросу ' + this.query;
            } else {
              this.catalogTitle = 'Ничего не найдено';
            }
          },
          error: () => {
            this.isLoading = false;
            this.catalogTitle = 'Ошибка поиска';
          }
        })
      );
    }
  }

  clearSearch(): void {
    this.query = '';
    this.getProducts();
    this.catalogTitle = 'Наши чайные коллекции';
  }
}
