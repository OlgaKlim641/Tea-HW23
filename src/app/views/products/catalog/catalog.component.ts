import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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
  protected catalogTitle: string = 'Наши чайные коллекции';
  protected isLoading: boolean = true;
  private subscription: Subscription = new Subscription();


  constructor(
    protected readonly productService: ProductService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.isLoading = true;
    this.subscription.add(
      this.productService.getProducts().subscribe({
        next: (value: ProductType[]) => {
          this.products = value;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.log(error);
          this.isLoading = false;
        }
      })
    );
  }

 public learnMore(product: ProductType): void {
    this.router.navigate(['/product', product.id]);
  }

 public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
