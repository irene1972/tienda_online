import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { isAdmin } from '../../../shared/utils/funciones';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-pedido',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css',
})
export class DetallePedido {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  pedidoId: string | null = null;
  pedido: any = [];
  isAdmin: boolean = false;
  estado_:string='';

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    
    this.miForm = new FormGroup({
      estado: new FormControl('', [])
    }, []);
  }

  ngOnInit() {
    if (isAdmin()) this.isAdmin = true;

    this.obtenerDetallePedido();
  }

  get estado() {
    return this.miForm.get('estado');
  }

  cargarDatos(){
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    const datos:any={};
    datos.estado=this.miForm.value.estado;
    datos.pedido_id=this.pedido[0].id;

    fetch(`${environment.apiUrl}/pedidos/cambiarEstado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(datos)
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          
          this.obtenerDetallePedido();
          this.mensaje = data.mensaje;
          this.tipo = true;
          

        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }

  obtenerDetallePedido(){
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
          //console.log(this.pedido);
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
    });
  }
}
