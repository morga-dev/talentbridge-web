import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
	selector: 'app-bottom-nav',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, MatIconModule, MatRippleModule],
	templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);

	private navigationEnd = toSignal(
		this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
			map(() => this.getDeepestRouteData())
		),
		{ initialValue: this.getDeepestRouteData() }
	);

	readonly isHidden = computed(() => this.navigationEnd()['hideBottomNav'] === true);

	readonly navItems = [
		{ icon: 'home', label: 'Inicio', route: '/home' },
		{ icon: 'work', label: 'Aplicaciones', route: '/aplicaciones' },
		{ icon: 'notifications', label: 'Notificaciones', route: '/notificaciones' },
		{ icon: 'person', label: 'Perfil', route: '/profile' },
	];

	private getDeepestRouteData() {
		let route = this.activatedRoute.root;
		while (route.firstChild) {
			route = route.firstChild;
		}
		return route.snapshot.data;
	}
}