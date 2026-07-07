import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './bottom-nav.component.html'
})
export class BottomNavComponent {
  activeTab = 'Home';

  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'apps', label: 'Aplicaciones', route: '/' },
    { icon: 'notifications', label: 'Notificaciones', route: '/' },
    { icon: 'person', label: 'Perfil', route: '/' }
  ];

  setActive(label: string): void {
    this.activeTab = label;
  }
}