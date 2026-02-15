export function isAdmin(){
    const usuarioString = localStorage.getItem('usuarioTiendaOnline');
    if (!usuarioString) {
      return false;
    } else {
      const usuario = JSON.parse(usuarioString);
      if(usuario.rol !== 'admin') return false;
      else return true;
    }
}