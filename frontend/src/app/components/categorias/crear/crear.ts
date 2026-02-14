import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor() {

    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ])

    }, []);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
/*
    fetch()
      .then()
      .then()
      .catch()
      .finally();
      */
  }
}
