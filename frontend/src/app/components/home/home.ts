import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { listarProductos } from '../../shared/utils/funciones';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productos: any = [];
  backendUrl = 'http://localhost:3000';

  constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.productos = await listarProductos();
    console.log(this.productos);
    this.cd.detectChanges();
  }

  getImageUrl(nombre: string): string {
    return `${this.backendUrl}/uploads/${nombre}`;
  }
}
