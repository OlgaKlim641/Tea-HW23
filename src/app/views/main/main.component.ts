import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  protected isPopup: boolean = false;
  protected isActive: boolean = false;
  private subscription: Subscription = new Subscription();
  private subscriptionActive: Subscription = new Subscription();
  private popupVisibility: string | null = '0';
  private keyPopupVisibility: string = 'popupVisibility';


  constructor() {}

 public ngOnInit(): void {
    this.initializeAccordion();
    this.subscription = timer(10000).subscribe(() => {
      this.popupVisibility = localStorage.getItem(this.keyPopupVisibility);
      if (!this.popupVisibility || this.popupVisibility === '0') {
        this.isPopup = true;
      }
    })
    this.subscriptionActive = timer(5000).subscribe(() => {
      this.isActive = true;
    })
  }

  private initializeAccordion() {
    $("#accordion").accordion({
      header: "> h3",
      heightStyle: "content",
      activate: function (event: any, ui: any) {
        $('.select-icon img').attr('src', 'assets/images/nextUp.png');
        if (ui.newHeader.length) {
          ui.newHeader.find('.select-icon img').attr('src', 'assets/images/down.png');
        }
      }
    });

    $('.select-icon').css({
      marginLeft: '15px'
    });

    $('.ui-accordion-header-icon').css({
      display: 'none'
    });
  }



  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionActive.unsubscribe();
    localStorage.setItem(this.keyPopupVisibility, '1')
  }

  protected closePopup(): void {
    this.isPopup = false;
    localStorage.setItem(this.keyPopupVisibility, '1')
  }
}

