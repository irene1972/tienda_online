import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-productos',
  imports: [RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  mensaje:string='';
  tipo:boolean=false;
  productos:any=[];

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    fetch(`${environment.apiUrl}/productos/listar`)
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        this.productos=data;
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }
}
