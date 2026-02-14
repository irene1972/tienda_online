import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

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
    fetch(`${environment.apiUrl}/categorias/listar`)
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
