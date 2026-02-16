import { environment } from "../../../environments/environment";

export function isAdmin() {
  const usuarioString = localStorage.getItem('usuarioTiendaOnline');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol !== 'admin') return false;
    else return true;
  }
}

export function isLogged() {
  const usuarioString = localStorage.getItem('usuarioTiendaOnline');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol === 'admin' || usuario.rol==='user') return true;
    else return false;
  }
}

export async function listarCategorias() {
  try {
    const response = await fetch(`${environment.apiUrl}/categorias/listar`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: 'Error al obtener las categorías' };
  }
}

export async function listarProductos() {
  try {
    const response = await fetch(`${environment.apiUrl}/productos/listar`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: 'Error al obtener los productos' };
  }
}

export async function listarProductosPorCategoria(id: string | null) {
  try {
    const response = await fetch(`${environment.apiUrl}/productos/listar/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: 'Error al obtener los productos' };
  }
}

export function statsCarrito() {
  let carrito:any=[];
  const carritoString = localStorage.getItem('carritoTiendaOnline');
  if (carritoString) carrito = JSON.parse(carritoString);
  const initialValue = 0;
  const cantidadTotal=carrito.reduce((accumulator:any,currentValue:any) => accumulator + currentValue.cantidad,
  initialValue);
  const total=carrito.reduce((accumulator:any,currentValue:any) => accumulator + (currentValue.producto.precio * currentValue.cantidad),
  initialValue);
  return {cantidadProductos:cantidadTotal,precioTotal:total}
}