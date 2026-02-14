import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Categorias } from './components/categorias/categorias';
import { Crear } from './components/categorias/crear/crear';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'usuario/registro',component:Registro},
    {path:'categoria',component:Categorias},
    {path:'categoria/crear',component:Crear},
    {path:'**',component:C404}
];
