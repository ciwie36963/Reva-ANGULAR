import { Pipe, PipeTransform } from '@angular/core';
import { Group } from './group/group.model';

@Pipe({
  name: 'groupFilter'
})
export class GroupFilterPipe implements PipeTransform {

  transform(groups: Group[], name: string): Group[] {
    if (!name || name.length === 0) {
      return groups;
    }
    return groups.filter(group =>
      group.code.toLowerCase().includes(name.toLowerCase())
    );
  }

}
