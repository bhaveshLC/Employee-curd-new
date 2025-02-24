import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<string>(localStorage.getItem('theme')!);
  backgroundColor = signal<string>('white');
  textColor = signal<string>('black');
  constructor() {
    if (!this.theme()) {
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      if (isDarkMode) {
        this.theme.set('dark');
        document.documentElement.classList.add('dark');
      } else {
        this.theme.set('light');
        document.documentElement.classList.remove('dark');
      }
    }
    this.applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (event) => {
      if (!localStorage.getItem('theme')) {
        const darkThemeMq = event.matches;
        if (darkThemeMq) {
          this.theme.set('dark');
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          this.theme.set('light');
        }
        this.applyTheme();
      }
    });
  }

  applyTheme() {
    if (this.theme() === 'dark') {
      this.backgroundColor.set('#2d343c');
      this.textColor.set('white');
      document.documentElement.classList.add('dark');
    } else {
      this.backgroundColor.set('white');
      this.textColor.set('black');
      document.documentElement.classList.remove('dark');
    }
  }
  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
    if (this.theme() === 'dark') {
      this.backgroundColor.set('#2d343c');
      this.textColor.set('white');
      document.documentElement.classList.add('dark');
    } else {
      this.backgroundColor.set('white');
      this.textColor.set('black');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', this.theme());
  }
}
