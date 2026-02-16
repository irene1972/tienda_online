import { ChangeDetectorRef, Component } from '@angular/core';
import { listarProductosPorCategoria } from '../../shared/utils/funciones';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-categoria',
  imports: [],
  templateUrl: './producto-categoria.html',
  styleUrl: './producto-categoria.css',
})
export class ProductoCategoria {
  productos: any = [];
  id:string|null='';

  constructor(private cd: ChangeDetectorRef,private route: ActivatedRoute) { }

  async ngOnInit() {
    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.listarPPC();
      this.cd.detectChanges();
    });
    
    this.listarPPC();
    
  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }

  async listarPPC(){
    this.productos = await listarProductosPorCategoria(this.id);
    this.cd.detectChanges();
  }
}
