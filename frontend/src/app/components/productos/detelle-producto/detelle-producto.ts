import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogged, listarCategorias } from '../../../shared/utils/funciones';
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
  producto: any = {};
  carrito: any = [];

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    if (!isLogged()) this.router.navigate(['/home']);

    this.categorias = await listarCategorias();

    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('id');
    });

    //recuperar el carrito del local store si lo tiene
    const carritoString = localStorage.getItem('carritoTiendaOnline');
    if (carritoString) this.carrito = JSON.parse(carritoString);

    //console.log(this.productoId);
    fetch(`${environment.apiUrl}/productos/obtener/${this.productoId}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.producto = data;

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

    this.muestraCategoria(1);
  }

  muestraCategoria(id: number) {
    return this.categorias.find((cat: any) => cat.id === id).nombre;
  }

  getImageUrl(nombre: string): string {
    return `${environment.backendUrl}/uploads/${nombre}`;
  }

  addCarrito() {
    const productoEncontrado = this.carrito.find((prod: any) => prod.id === this.producto.id);
    if (productoEncontrado) {
      //modificas la cantidad a uno
      this.carrito.map((prod: any) => {
        if (prod.id === this.producto.id) {
          prod.cantidad += 1;
          return prod;
        }
        return prod;
      });
    }
    else {
      //haces el push del producto en el carrito
      this.carrito.push({
        id: this.producto.id,
        producto: this.producto,
        cantidad: 1
      });

    }
    //console.log(this.carrito);
    localStorage.setItem('carritoTiendaOnline', JSON.stringify(this.carrito));
    this.router.navigate(['/carrito']);
  }
}
