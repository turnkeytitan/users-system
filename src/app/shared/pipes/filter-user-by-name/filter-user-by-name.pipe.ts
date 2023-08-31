import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@feature/users/create-user/shared/interfaces/userList.interface';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {
  transform(values: User[], filter: string) {
    const filtered = values.filter((value) => {
      if (!filter?.length || filter.length < 3) return true;
      return value.first_name.toLowerCase().includes(filter.toLowerCase());
    });

    return filtered;
  }
}
