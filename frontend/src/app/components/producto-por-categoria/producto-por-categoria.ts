import { ChangeDetectorRef, Component } from '@angular/core';
import { listarProductosPorCategoria } from '../../shared/utils/funciones';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-por-categoria',
  imports: [],
  templateUrl: './producto-por-categoria.html',
  styleUrl: './producto-por-categoria.css',
})
export class ProductoPorCategoria {
  productos: any = [];
  id:string|null='';

  constructor(private cd: ChangeDetectorRef,private route: ActivatedRoute) { }

  async ngOnInit() {
    
    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cd.detectChanges();
    });
    
    this.productos = await listarProductosPorCategoria(this.id);
    console.log(this.productos);
    this.cd.detectChanges();
  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }
}
