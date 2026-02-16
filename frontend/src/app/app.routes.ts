import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Categorias } from './components/categorias/categorias';
import { Crear } from './components/categorias/crear/crear';
import { Productos } from './components/productos/productos';
import { CrearProducto } from './components/productos/crear-producto/crear-producto';
import { EditarProducto } from './components/productos/editar-producto/editar-producto';
import { ProductoCategoria } from './components/producto-categoria/producto-categoria';
import { DetelleProducto } from './components/productos/detelle-producto/detelle-producto';
import { Carrito } from './components/carrito/carrito';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'usuario/registro',component:Registro},
    {path:'categoria',component:Categorias},
    {path:'categoria/:id',component:ProductoCategoria},
    {path:'categoria/crear',component:Crear},
    {path:'producto',component:Productos},
    {path:'producto/crear',component:CrearProducto},
    {path:'producto/editar/:id',component:EditarProducto},
    {path:'producto/detalle/:id',component:DetelleProducto},
    {path:'carrito',component:Carrito},
    {path:'**',component:C404}
];
