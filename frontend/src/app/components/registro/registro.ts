import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  miForm:FormGroup;

  constructor(){
    
    this.miForm=new FormGroup({
      nombre:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      apellidos:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.pattern( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])

    },[]);
  }

  cargarDatos(){
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    fetch('http://localhost:3000/api/usuarios',{
      method:'POST',
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify(this.miForm.value)
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
      })
      .catch(error=>console.log(error));
  }
}
