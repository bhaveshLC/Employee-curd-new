import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/service/Theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  themeService = inject(ThemeService);
  ngOnInit(): void {
    if (this.themeService.theme() === 'dark') {
      console.log('dark mode');
      document.documentElement.classList.add('dark');
    } else {
      console.log('light');
      document.documentElement.classList.remove('dark');
    }
  }
}
