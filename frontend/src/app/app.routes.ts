import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Categorias } from './components/categorias/categorias';
import { Crear } from './components/categorias/crear/crear';
import { Productos } from './components/productos/productos';
import { CrearProducto } from './components/productos/crear-producto/crear-producto';
import { EditarProducto } from './components/productos/editar-producto/editar-producto';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'usuario/registro',component:Registro},
    {path:'categoria',component:Categorias},
    {path:'categoria/crear',component:Crear},
    {path:'producto',component:Productos},
    {path:'producto/crear',component:CrearProducto},
    {path:'producto/editar/:id',component:EditarProducto},
    {path:'**',component:C404}
];
