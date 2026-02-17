import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { isAdmin } from '../../shared/utils/funciones';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, RouterLink],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos {
  mensaje: string = '';
  tipo: boolean = false;
  pedidos: any = [];

  constructor(private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    if (!isAdmin()) this.router.navigate(['/home']);

    fetch(`${environment.apiUrl}/pedidos`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        
        this.pedidos = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  buscarDatos(event:Event,tipo:string){
    const inputNumPedido=event.target as HTMLInputElement;
    if(tipo==='pedido'){
      this.buscarPedidoPorId();
    }
    if(tipo==='coste'){
      this.buscarPedidosPorCoste();
    }
    if(tipo==='fecha'){
      this.buscarPedidosPorFecha();
    }
    if(tipo==='email'){
      this.buscarPedidosPorEmail();
    }
    //if(inputNumPedido.value.length<3) return;

  }

  buscarPedidoPorId(){

  }

  buscarPedidosPorCoste(){

  }

  buscarPedidosPorFecha(){

  }

  buscarPedidosPorEmail(){
    
  }

}
