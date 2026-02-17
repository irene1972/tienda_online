import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { listarCategorias } from '../../shared/utils/funciones';

@Component({
  selector: 'app-categorias',
  imports: [RouterLink],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {
  categorias: any = {};
  mensaje: string = '';
  tipo: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    const data: any = await listarCategorias();
    //console.log(data);
    if (data.error) {
      this.mensaje = data.error;
      return;
    }
    this.categorias = data;
    this.cd.detectChanges();
  }
}
