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