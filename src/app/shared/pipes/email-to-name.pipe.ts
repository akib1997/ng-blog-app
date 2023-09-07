import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailToName',
})
export class EmailToNamePipe implements PipeTransform {
  transform(email: string): string {
    const parts = email.split('@');
    if (parts.length === 2) {
      const namePart = parts[0].replace('_', ' ').replace('.', ' ');
      return this.capitalizeFirstLetter(namePart);
    }
    return email;
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
