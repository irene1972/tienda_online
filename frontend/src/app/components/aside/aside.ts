import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aside',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario:any=false;

  constructor(private cd: ChangeDetectorRef, private router: Router) {

    this.miForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])

    }, []);
  }

  ngOnInit(){
    const usuarioString=localStorage.getItem('usuarioTiendaOnline');
    if(usuarioString) this.usuario=JSON.parse(usuarioString);
  }

  get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }
  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    fetch(`${environment.apiUrl}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.miForm.value)
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);

        if(data.error){
          this.mensaje=data.error;
          return;
        }

        this.usuario=data;
        localStorage.setItem('usuarioTiendaOnline',JSON.stringify(this.usuario));
        this.mensaje='El usuario se ha logueado correctamente';
        this.tipo=true;
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }
  cerrarSesion(){
    localStorage.removeItem('usuarioTiendaOnline');
    this.usuario=false;
  }
}
