// tslint:disable-next-line:quotemark
import { Category } from "./category.model";

export class Product {
    name: string;
    id: number;
    category: Category;
    price: number;
    quantity: number;
    quantityInCart: number;

    constructor(id: number,
                name: string,
                category: Category,
                price: number) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = 1;
        this.quantityInCart = 0;
    }

    copy(): Product {
        const copy = new Product(this.id, this.name, this.category, this.price);
        copy.quantityInCart = this.quantity;
        return copy;
    }

}
