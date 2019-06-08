export class Persona {

  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor(nombre: string, pass: string, rol: string, puntos: number) {
    this.nombre = nombre;
    this.pass = pass;
    this.rol = rol;
    this.puntos = puntos;
  }
}
