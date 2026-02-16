import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { listarProductos } from '../../shared/utils/funciones';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productos: any = [];

  constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.productos = await listarProductos();
    console.log(this.productos);
    this.cd.detectChanges();
  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }
}
