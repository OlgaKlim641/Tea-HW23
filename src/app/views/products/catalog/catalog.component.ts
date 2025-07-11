import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";




@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  protected products: ProductType[] = [];
  searchQuery: string = '';
  protected catalogTitle: string = 'Наши чайные коллекции';
  protected isLoading: boolean = true;
  private subscription: Subscription = new Subscription();


  constructor(
    protected readonly productService: ProductService,
    private route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'] || '';
        this.loadProducts();
      })
    );
  }

  private loadProducts(): void {
    this.isLoading = true;

    if (this.searchQuery.trim() === '') {
      this.subscription.add(
        this.productService.getProducts().subscribe({
          next: (products) => {
            this.products = products;
            this.catalogTitle = 'Наши чайные коллекции';
            this.isLoading = false;
          },
          error: () => {
            this.products = [];
            this.catalogTitle = 'Ошибка загрузки товаров';
            this.isLoading = false;
          }
        })
      );
    } else {
      this.subscription.add(
        this.productService.searchProduct(this.searchQuery).subscribe({
          next: (products) => {
            this.products = products;
            if (products.length === 0) {
              this.catalogTitle = `По запросу "${this.searchQuery}" ничего не найдено`;
            } else {
              this.catalogTitle = `Результаты поиска по запросу "${this.searchQuery}"`;
            }
            this.isLoading = false;
          },
          error: () => {
            this.products = [];
            this.catalogTitle = 'Ошибка поиска';
            this.isLoading = false;
          }
        })
      );
    }
  }

 public learnMore(product: ProductType): void {
    this.router.navigate(['/product', product.id]);
  }

 public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
