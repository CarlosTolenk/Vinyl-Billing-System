import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sortingItem'
})

export class SortingItemPipe implements PipeTransform {
  transform(items: any[], path: string[], order: number): any[] {

    // Check if is not null
    if (!items || !path || !order) return items;

    return items.sort((a: any, b: any) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a.data[property];
        b = b.data[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }

}