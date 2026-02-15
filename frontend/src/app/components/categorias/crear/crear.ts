import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { isAdmin } from '../../../shared/utils/funciones';

@Component({
  selector: 'app-crear',
  imports: [ReactiveFormsModule],
  templateUrl: './crear.html',
  styleUrl: './crear.css',
})
export class Crear {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario: any = {};

  constructor(private cd: ChangeDetectorRef, private router: Router) {

    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ])

    }, []);
  }

  ngOnInit() {
    if(!isAdmin()) this.router.navigate(['/home']);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  cargarDatos() {
    if (this.usuario) this.miForm.value.rol = this.usuario.rol;
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    fetch(`${environment.apiUrl}/categorias/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.miForm.value)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        this.tipo = true;
        this.mensaje = data.mensaje;
        this.miForm.reset();

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

  }
}
