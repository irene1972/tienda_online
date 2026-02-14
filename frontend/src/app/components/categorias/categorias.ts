import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {
  categorias:any={};
  mensaje:string='';
  tipo:boolean=false;

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    fetch(`http://localhost:3000/api/categorias/listar`)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        this.categorias=data;
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }
}
