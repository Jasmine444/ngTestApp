import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  id: number;

  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private dataService: DataService,
    private router: Router) {

      this.loginService.isActiveSession();

    }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {

      this.id = params['id'];
      this.product = this.getProductByProductId(this.id);
    });

  }


  getProductByProductId(id: number): Product {

    for (const i in this.dataService.products) {
      // tslint:disable-next-line:triple-equals
      if (this.dataService.products[i].id == id) {
        return this.dataService.products[i];
      }
    }
  }

}
