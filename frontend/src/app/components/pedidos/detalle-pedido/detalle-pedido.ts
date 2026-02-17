import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-detalle-pedido',
  imports: [RouterLink],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css',
})
export class DetallePedido {
  mensaje: string = '';
  pedidoId: string | null = null;
  pedido: any = [];

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      this.pedidoId = params.get('id');
      if (!this.pedidoId) this.router.navigate(['/pedido/mis-pedidos']);

      fetch(`${environment.apiUrl}/pedidos/detalle/${this.pedidoId}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          this.pedido = data;
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
    });
  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }

}
