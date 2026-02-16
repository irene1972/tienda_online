import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { statsCarrito } from '../../shared/utils/funciones';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  carrito:any=[];
  stats:any={};

  ngOnInit(){
    const carritoString=localStorage.getItem('carritoTiendaOnline');
    if(carritoString) this.carrito=JSON.parse(carritoString);
    this.stats=statsCarrito();

  }

  getImageUrl(nombre: string): string {
      return `${environment.backendUrl}/uploads/${nombre}`;
    }
}
