import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ColorScheme = 'light' | 'dark';
export type ThemeId = 'theme-talentbridge';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeId: ThemeId = 'theme-talentbridge';
  private mediaQuery: MediaQueryList | null = null;
  
  // Guardamos una bandera para saber si el usuario decidió el tema manualmente
  private isManualSelection = false; 

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const initialScheme = this.getSystemScheme();

    this.applyTheme(this.themeId, initialScheme);
    this.watchSystemScheme();
  }

  setScheme(scheme: ColorScheme): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.isManualSelection = true;
    this.applyTheme(this.themeId, scheme);
  }

  toggleScheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const nextScheme: ColorScheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    this.setScheme(nextScheme);
  }

  private applyTheme(themeId: ThemeId, scheme: ColorScheme): void {
    const body = document.body;
    body.classList.remove('theme-talentbridge', 'light', 'dark');
    body.classList.add(themeId, scheme);
  }

  private getSystemScheme(): ColorScheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private watchSystemScheme(): void {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.mediaQuery.addEventListener('change', (event) => {
      if (!this.isManualSelection) {
        this.applyTheme(this.themeId, event.matches ? 'dark' : 'light');
      }
    });
  }
}