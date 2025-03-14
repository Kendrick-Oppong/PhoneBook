import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  LayoutDashboard,
  Contact,
  Heart,
  Settings,
  Grip,
  Menu,
  UserPlus,
} from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { ContactType } from '@app/interface';
import { LoaderComponent } from '@components/loader/loader.component';
import { AuthService } from '@app/services/auth/auth.service';
import { PostgrestSingleResponse, User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { ContactCardComponent } from '@components/contact-card/contact-card.component';
import { ContactFilterPipe } from '@app/pipes/contact-filter.pipe';
@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    LoaderComponent,
    AsyncPipe,
    ContactCardComponent,
    ContactFilterPipe,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  readonly icons = {
    LayoutDashboard,
    Contact,
    Heart,
    Settings,
    Grip,
    Menu,
    UserPlus,
  };
  filterTerm = '';

  contacts$: Observable<PostgrestSingleResponse<ContactType[]> | null> =
    this.contactsService.getAllContacts();
  isLoading = false;
  user$: Observable<User | null> = this.authService.getCurrentUser();

  constructor(
    private readonly router: Router,
    private readonly contactsService: ContactsService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    console.log('this.searchTerm', this.filterTerm);
  }

  loadContacts(): void {
    this.isLoading = true;

    // this.contactsService.getAllContacts().subscribe({
    //   next: (data) => {
    //     if (data?.data) {
    //       this.contacts = data.data || [];
    //     }
    //     this.isLoading = false;

    //     // Manually trigger change detection after data is loaded
    //     this.cdRef.detectChanges();
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     console.error('Error fetching contacts:', error.message);

    //     // Trigger change detection in case of error as well
    //     this.cdRef.detectChanges();
    //   },
    // });
  }

  onSearch() {
    console.log('this.searchTerm', this.filterTerm);
  }
}
