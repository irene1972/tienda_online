import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  imports: [],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css',
})
export class DetallePedido {

  pedidoId:string|null=null;

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      this.pedidoId = params.get('id');
    });
  }

}
