import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  query: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSearch(): void {
    const trimmedQuery = this.query.trim();
    if (trimmedQuery) {
      this.router.navigate(['/catalog'], { queryParams: { q: trimmedQuery } });
    }
  }

  clearSearch(): void {
    this.query = ''

  }
}
