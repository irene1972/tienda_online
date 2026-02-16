import { ChangeDetectorRef, Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isAdmin, listarCategorias } from '../../../shared/utils/funciones';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-detelle-producto',
  imports: [],
  templateUrl: './detelle-producto.html',
  styleUrl: './detelle-producto.css',
})
export class DetelleProducto {
  productoId: string | null = null;
  categoria: number | null = null;
  mensaje: string = '';
  tipo: boolean = false;
  categorias: any = [];
  producto:any={};

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    if (!isAdmin()) this.router.navigate(['/home']);

    this.categorias = await listarCategorias();

    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('id');
    });

    console.log(this.productoId);
    fetch(`${environment.apiUrl}/productos/obtener/${this.productoId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.producto=data;

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

    this.muestraCategoria(1);
  }

  muestraCategoria(id:number){
    return this.categorias.find((cat: any)=>cat.id===id).nombre;
  }
  
  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }
}
