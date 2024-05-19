import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(Producs: Product[], term: string): Product[] {
    return Producs.filter((Product) =>
      Product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
