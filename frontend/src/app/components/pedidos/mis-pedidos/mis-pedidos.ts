import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule ,DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { isLogged } from '../../../shared/utils/funciones';

@Component({
  standalone:true,
  selector: 'app-mis-pedidos',
  imports: [CommonModule,RouterLink],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css',
})
export class MisPedidos {

  mensaje:string='';
  tipo:boolean=false;
  usuario:any={};
  pedidos:any=[];

  constructor(private cd: ChangeDetectorRef,private router: Router){}

  ngOnInit(){
    if(!isLogged()) this.router.navigate(['/home']);

    const usuarioString=localStorage.getItem('usuarioTiendaOnline');
    if(usuarioString) this.usuario=JSON.parse(usuarioString);
    console.log(this.usuario);

    fetch(`${environment.apiUrl}/pedidos/mis-pedidos/${this.usuario.id}`)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        /*
        this.mensaje=data.mensaje;
        this.tipo=true;
        */
        this.pedidos=data;
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }

}
