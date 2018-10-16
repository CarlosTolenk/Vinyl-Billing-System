import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  transform(items: any, term: any): any {

    //Check if search term is undefined
    if(term == '') return items;

    //return updated items arrys
    return items.filter((item) => {
      let name =  item.data.name.toLowerCase().includes(term.toLowerCase());
      let type =  item.data.type.toLowerCase().includes(term.toLowerCase());
      return name + type;
    })
  }
}