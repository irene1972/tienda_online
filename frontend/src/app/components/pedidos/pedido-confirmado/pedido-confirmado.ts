import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pedido-confirmado',
  imports: [],
  templateUrl: './pedido-confirmado.html',
  styleUrl: './pedido-confirmado.css',
})
export class PedidoConfirmado {
  mensaje: string = '';
  tipo: boolean = false;
  pedido: any = {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTiendaOnline');
    const pedidoString = localStorage.getItem('pedidoTiendaOnline');

    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);

      fetch(`${environment.apiUrl}/pedidos/confirmado/${usuario.id}/${pedidoString}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          this.mensaje = data.mensaje;
          this.tipo = true;
          this.pedido = data;

        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
    }

  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }
}
