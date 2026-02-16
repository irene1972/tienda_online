import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isAdmin, statsCarrito } from '../../../shared/utils/funciones';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-crear-pedido',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear-pedido.html',
  styleUrl: './crear-pedido.css',
})
export class CrearPedido {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario: any = {};
  carrito:any=[];

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      provincia: new FormControl('', [
        Validators.required
      ]),
      ciudad: new FormControl('', [
        Validators.required
      ]),
      direccion: new FormControl('', [
        Validators.required
      ])

    }, []);
  }
  ngOnInit() {
    if (!isAdmin()) this.router.navigate(['/home']);
  }

  get provincia() {
    return this.miForm.get('provincia');
  }

  get ciudad() {
    return this.miForm.get('provincia');
  }

  get direccion() {
    return this.miForm.get('provincia');
  }

  cargarDatosEnvio() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    //extraer el usuario del local storage
    const usuarioString = localStorage.getItem('usuarioTiendaOnline');
    if (usuarioString) this.usuario = JSON.parse(usuarioString);

    //extraer el carrito del local storage
    const carritoString=localStorage.getItem('carritoTiendaOnline');
    if(carritoString) this.carrito=JSON.parse(carritoString);

    //extraer el total del local storage
    const stats=statsCarrito();

    let datos:any={};
    datos.usuario_id=this.usuario.id;
    datos.provincia=this.miForm.value.provincia;
    datos.ciudad=this.miForm.value.ciudad;
    datos.direccion=this.miForm.value.direccion;
    datos.coste=stats.precioTotal;
    datos.carrito=this.carrito;

    fetch(`${environment.apiUrl}/pedidos/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(datos)
    })
      .then(response => response.json())
      .then(data => {
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        this.mensaje=data.mensaje;
        this.tipo=true;
        this.miForm.reset();

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
