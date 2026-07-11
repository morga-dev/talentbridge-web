import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationType, AppNotification, NotificationFilter } from '../../models/notifications.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  // Datos de prueba
  private readonly allNotifications = signal<AppNotification[]>([
    {
      id: 1,
      type: 'postulacion',
      title: 'Postulación enviada',
      message: 'Tu postulación a "Desarrollador Frontend Jr" en UpTap fue enviada correctamente.',
      date: 'Hoy, 10:24 a.m.',
      read: false
    },
    {
      id: 2,
      type: 'entrevista',
      title: 'Entrevista agendada',
      message: 'UpTap agendó una entrevista contigo para el 20/07/2026.',
      date: 'Hoy, 9:02 a.m.',
      read: false
    },
    {
      id: 3,
      type: 'beca',
      title: 'Nueva beca disponible',
      message: 'Hay una nueva beca de "Desarrollo de Software" que coincide con tu perfil.',
      date: 'Ayer, 6:45 p.m.',
      read: true
    },
    {
      id: 4,
      type: 'sistema',
      title: 'Actualiza tu perfil',
      message: 'Agrega tu CV para aumentar tus posibilidades de ser contactado por empresas.',
      date: 'Lun, 8 jul',
      read: true
    }
  ]);

  readonly activeFilter = signal<NotificationFilter>('todas');

  readonly totalCount = computed(() => this.allNotifications().length);
  readonly unreadCount = computed(() => this.allNotifications().filter((n) => !n.read).length);
  readonly readCount = computed(() => this.allNotifications().filter((n) => n.read).length);

  readonly filteredNotifications = computed(() => {
    const filter = this.activeFilter();
    const notifications = this.allNotifications();

    if (filter === 'noLeidas') return notifications.filter((n) => !n.read);
    if (filter === 'leidas') return notifications.filter((n) => n.read);
    return notifications;
  });

  setFilter(filter: NotificationFilter): void {
    this.activeFilter.set(filter);
  }

  markAsRead(notification: AppNotification): void {
    if (notification.read) return;

    this.allNotifications.update((list) =>
      list.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
  }

  markAllAsRead(): void {
    this.allNotifications.update((list) => list.map((n) => ({ ...n, read: true })));
  }

  deleteNotification(notification: AppNotification): void {
    this.allNotifications.update((list) => list.filter((n) => n.id !== notification.id));
  }

  deleteAll(): void {
    this.allNotifications.set([]);
  }

  iconFor(type: NotificationType): string {
    switch (type) {
      case 'postulacion':
        return 'work';
      case 'entrevista':
        return 'event_available';
      case 'beca':
        return 'school';
      case 'sistema':
      default:
        return 'info';
    }
  }
}
