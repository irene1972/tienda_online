import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { listarProductos } from '../../shared/utils/funciones';

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

  async ngOnInit(){
    this.productos=await listarProductos();
    this.cd.detectChanges();
  }

  borrarProducto(id:number){
  
    fetch(`${environment.apiUrl}/productos/borrar/${id}`,{
      method:'DELETE'
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        this.mensaje=data.mensaje;
        this.tipo=true;
        location.reload();
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }
}
