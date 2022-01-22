import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'casteFilter'
})
export class CasteFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => (item.religionid==filter));
  }

}
