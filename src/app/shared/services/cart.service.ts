import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { count, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  addToCart(productId: string): Observable<any> {
    let bodyObject: object = {
      productId: productId,
    };
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      bodyObject
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  removeItems(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    );
  }

  updateCartProduct(productId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: newCount,
      }
    );
  }

  chckOut(cartId: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: userData,
      }
    );
  }
}
