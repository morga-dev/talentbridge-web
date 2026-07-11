export type NotificationType = 'postulacion' | 'beca' | 'entrevista' | 'sistema';

export type NotificationFilter = 'todas' | 'noLeidas' | 'leidas';

export interface AppNotification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    date: string;
    read: boolean;
}
