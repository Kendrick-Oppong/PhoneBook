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
  Phone,
  Mail,
  EllipsisVertical,
} from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    NgOptimizedImage,
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
    Phone,
    Mail,
    EllipsisVertical,
  };
  searchTerm = '';

  constructor(private readonly router: Router) { }
  
  ngOnInit(): void {
      console.log(this.searchTerm)
  }
}
