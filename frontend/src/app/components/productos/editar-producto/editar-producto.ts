import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isAdmin, listarCategorias } from '../../../shared/utils/funciones';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editar-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css',
})
export class EditarProducto implements OnInit {
  productoId: string | null = null;
  categoria: number | null = null;
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  categorias: any = [];

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {

    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      precio: new FormControl('', [

      ]),
      stock: new FormControl('', [

      ]),
      oferta: new FormControl('', [

      ]),
      imagen: new FormControl('', [

      ]),
      categoria: new FormControl('', [
        Validators.required
      ])

    }, []);
  }

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
        this.miForm.patchValue({
          categoria: data.categoria_id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          stock: data.stock,
          oferta: data.oferta,
          /*fecha:data.fecha,
          imagen:data.imagen*/

        });

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get descripcion() {
    return this.miForm.get('descripcion');
  }

  get precio() {
    return this.miForm.get('precio');
  }

  get stock() {
    return this.miForm.get('stock');
  }

  get oferta() {
    return this.miForm.get('oferta');
  }

  get imagen() {
    return this.miForm.get('imagen');
  }

  async cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    const formData = new FormData();

    formData.append('nombre', this.miForm.get('nombre')?.value);
    formData.append('descripcion', this.miForm.get('descripcion')?.value);
    formData.append('precio', this.miForm.get('precio')?.value);
    formData.append('stock', this.miForm.get('stock')?.value);
    formData.append('oferta', this.miForm.get('oferta')?.value);
    formData.append('categoria', this.miForm.get('categoria')?.value);

    const imagen = this.miForm.get('imagen')?.value;
    formData.append('imagen', imagen);

    try {
      console.log(this.imagen?.value);
      const response = await fetch(`${environment.apiUrl}/productos/editar/${this.productoId}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      console.log(data);
      if (data.error) {
        this.mensaje = data.error;
        return;
      }
      //todo: redirect a productos

    } catch (error) {
      this.mensaje = 'Error al actualizar el producto';
      this.tipo = false;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.miForm.patchValue({
        imagen: file
      });

      this.miForm.get('imagen')?.updateValueAndValidity();
    }
  }
}
