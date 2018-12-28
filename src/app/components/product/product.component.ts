import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  @Output() added = new EventEmitter<Product>();
  @Output() removed = new EventEmitter<Product>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addProduct(product: Product) {
    this.added.emit(this.product);
  }

  removeProduct(product: Product) {
    this.removed.emit(this.product);
  }


  gotoDetails(product: Product) {
    this.router.navigate(['/product-details/' + product.id]);
  }
}
