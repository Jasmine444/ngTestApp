import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[];
  debug: boolean;
  webApiUrl: string;

  sum: number;
  cart: Product[] = [];

  errorMessage: string;

  isCart: boolean;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private dataService: DataService,
  private router: Router, private loginService: LoginService, private configService: ConfigService) {

      this.loginService.isActiveSession();

      this.configService.getConfig().subscribe(config => {
        this.debug = config['debug'];
        this.webApiUrl = config['webApiUrl'];
        this.getData();
      });

   }

  ngOnInit() {
      this.sum = 0;
  }

  getData() {
    this.dataService.categories = [];
    this.dataService.getCategories(this.webApiUrl)
    .subscribe(categories => {
      categories['value'].forEach((p) => this.dataService.categories.push(
          new Category(p['CategoryID'], p['CategoryName'])
        )
      );

      this.products = [];
      this.dataService.getProducts(this.webApiUrl)
      .subscribe(products => {
          if (this.debug) {
            // tslint:disable-next-line:no-debugger
            debugger;
          }
          products['value'].forEach((p) => this.products.push(
            new Product(p['ProductID'], p['ProductName'], this.getCategoryByCategoryId(p['CategoryID']), p['UnitPrice'])
          )
        );

        this.dataService.products = this.products;
      });

    });
  }

  getCategoryByCategoryId(id: number): Category {
    for (const i in this.dataService.categories) {
      if (this.dataService.categories[i].id === id) {
        return this.dataService.categories[i];
      }
    }
  }

  onAdd(product: Product) {
    if (this.debug) {
    // tslint:disable-next-line:no-debugger
    debugger;
    }
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index === -1) {
      const copy = product.copy();
      this.cart.push(copy);
    } else {
      this.cart[index].quantityInCart += product.quantity;
    }
    this.sum += product.price * product.quantity;
  }

  onRemove(product: Product) {
    this.errorMessage = '';
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index === -1) {
      this.errorMessage = 'Product doesn\'t exist in cart';
    } else if (this.cart[index].quantity < product.quantity) {
      this.errorMessage = 'There isn\'t enough products in cart';
    } else {
      this.cart[index].quantityInCart -= product.quantity;
      this.sum -= product.price * product.quantity;
    }
    if (index !== -1 && this.cart[index].quantityInCart === 0) {
      this.cart.splice(index, 1);
    }
  }

}
