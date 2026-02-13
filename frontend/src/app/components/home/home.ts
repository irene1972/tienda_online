import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Aside } from '../aside/aside';

@Component({
  selector: 'app-home',
  imports: [Aside],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   ngOnInit(): void {
    console.log(environment.apiUrl);
  }
}
