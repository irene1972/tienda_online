import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isAdmin } from '../../../shared/utils/funciones';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-pedido',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './crear-pedido.html',
  styleUrl: './crear-pedido.css',
})
export class CrearPedido {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario: any = {};

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
  }
}
