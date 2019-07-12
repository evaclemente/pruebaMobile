export class Persona {

  nombre: string;
  pass: string;
  rol: string;
  pelo: boolean;
  ojos: boolean;
  complemento: boolean;
  voz: boolean;

  constructor(nombre: string, pass: string, rol: string, pelo: boolean, ojos: boolean, complemento: boolean, voz: boolean) {
    this.nombre = nombre;
    this.pass = pass;
    this.rol = rol;
    this.pelo = pelo;
    this. ojos = ojos;
    this.complemento = complemento;
    this.voz = voz;
  }
}
