import { Pipe, PipeTransform } from '@angular/core';
import { ContactType } from '@app/interface';

@Pipe({
  name: 'contactFilter',
})
  
export class ContactFilterPipe implements PipeTransform {
  transform(
    contacts: ContactType[],
    filterTerm: string
  ): ContactType[] {
    if (!contacts.length || !filterTerm) {
      return contacts;
    }
    const lowerCaseFilterTerm = filterTerm.toLocaleLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(lowerCaseFilterTerm)
    );
  }
}
