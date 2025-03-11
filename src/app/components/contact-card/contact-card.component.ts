import { NgOptimizedImage } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { ContactType } from '@app/interface';
import {
  EllipsisVertical,
  LucideAngularModule,
  Phone,
  Mail,
  Trash2,
  Pencil,
  Heart,
} from 'lucide-angular';

@Component({
  selector: 'app-contact-card',
  imports: [NgOptimizedImage, LucideAngularModule],
  templateUrl: './contact-card.component.html',
})
export class ContactCardComponent {
  readonly icons = {
    EllipsisVertical,
    Phone,
    Mail,
    Trash2,
    Pencil,
    Heart,
  };
  contact: InputSignal<ContactType> = input.required();
}
