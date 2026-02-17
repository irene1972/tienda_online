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
  pedidosFiltrados:any=[];

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
        this.pedidosFiltrados=data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  buscarDatos(event:Event,tipo:string){
    const input=event.target as HTMLInputElement;
    const valor=input.value;
    if(tipo==='pedido'){
      if(!valor){
        this.pedidosFiltrados=this.pedidos;
        this.cd.detectChanges();
        return;
      }
      this.buscarPedidoPorId(valor);
      return;
    }
    if(tipo==='coste'){
      if(!valor){
        this.pedidosFiltrados=this.pedidos;
        this.cd.detectChanges();
        return;
      }
      this.buscarPedidosPorCoste(valor);
      return;
    }
    if(tipo==='fecha'){
      if(!valor){
        this.pedidosFiltrados=this.pedidos;
        this.cd.detectChanges();
        return;
      }
      this.buscarPedidosPorFecha(valor);
      return;
    }
    if(tipo==='email'){
      if(!valor){
        this.pedidosFiltrados=this.pedidos;
        this.cd.detectChanges();
        return;
      }
      if(valor.length<3) return;
      this.buscarPedidosPorEmail(valor);
      return;
    }
    

  }

  buscarPedidoPorId(id:string){
    this.pedidosFiltrados=[];
    this.cd.detectChanges();
    fetch(`${environment.apiUrl}/pedidos/find-by-id/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        
        this.pedidosFiltrados = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  buscarPedidosPorCoste(coste:string){
    console.log(coste);
    this.pedidosFiltrados=[];
    this.cd.detectChanges();
    fetch(`${environment.apiUrl}/pedidos/find-by-coste/${coste}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        
        this.pedidosFiltrados = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

  }

  buscarPedidosPorFecha(fecha:string){
    console.log(fecha);
    this.pedidosFiltrados=[];
    this.cd.detectChanges();
    fetch(`${environment.apiUrl}/pedidos/find-by-fecha/${fecha}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        
        this.pedidosFiltrados = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  buscarPedidosPorEmail(email:string){
    this.pedidosFiltrados=[];
    this.cd.detectChanges();
    fetch(`${environment.apiUrl}/pedidos/find-by-email/${email}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        
        this.pedidosFiltrados = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

}
