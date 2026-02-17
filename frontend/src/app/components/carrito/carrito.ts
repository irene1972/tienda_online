import { ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    const carritoString=localStorage.getItem('carritoTiendaOnline');
    if(carritoString) this.carrito=JSON.parse(carritoString);
    this.stats=statsCarrito();

  }

  getImageUrl(nombre: string): string {
      return `${environment.backendUrl}/uploads/${nombre}`;
    }
  
  vaciarCarrito(){
    localStorage.removeItem('carritoTiendaOnline');
    location.reload();
  }

  eliminarProducto(id:number){
    console.log(this.carrito);
    this.carrito=this.carrito.filter((elem:any)=>elem.id !== id);
    localStorage.setItem('carritoTiendaOnline',JSON.stringify(this.carrito));
    this.cd.detectChanges();
  }

  decrementar(id:number){
    
    const cantidad=this.getCantidadFromProd();
    if(cantidad>0){
      this.carrito=this.carrito.map((elem:any)=>{
        if(elem.id===id){
          elem.cantidad=parseInt(elem.cantidad)-1;
          return elem;
        }
        return elem;
      });
      localStorage.setItem('carritoTiendaOnline',JSON.stringify(this.carrito));
    }
  }

  incrementar(id:number){
    this.carrito=this.carrito.map((elem:any)=>{
        if(elem.id===id){
          elem.cantidad=parseInt(elem.cantidad)+1;
          return elem;
        }
        return elem;
      });
    localStorage.setItem('carritoTiendaOnline',JSON.stringify(this.carrito));
  }

  getCantidadFromProd(){
    return 3;
  }
}
