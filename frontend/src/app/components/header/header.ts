import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { listarCategorias } from '../../shared/utils/funciones';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  categorias:any=[];

  constructor(private cd: ChangeDetectorRef){}

  async ngOnInit() {
    this.categorias = await listarCategorias();
    //console.log(this.categorias);
    this.cd.detectChanges();
  }
}
