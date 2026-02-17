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
import { CrearPedido } from './components/pedidos/crear-pedido/crear-pedido';
import { PedidoConfirmado } from './components/pedidos/pedido-confirmado/pedido-confirmado';
import { MisPedidos } from './components/pedidos/mis-pedidos/mis-pedidos';
import { DetallePedido } from './components/pedidos/detalle-pedido/detalle-pedido';
import { Pedidos } from './components/pedidos/pedidos';

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
    {path:'pedido/crear',component:CrearPedido},
    {path:'pedido/confirmado',component:PedidoConfirmado},
    {path:'pedido/detalle/:id',component:DetallePedido},
    {path:'pedido/mis-pedidos',component:MisPedidos},
    {path:'pedido',component:Pedidos},
    {path:'carrito',component:Carrito},
    {path:'**',component:C404}
];
