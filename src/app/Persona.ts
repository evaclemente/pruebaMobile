export class Persona {

  nombre: string;
  pass: string;
  rol: string;
  pelo: boolean;
  ojos: boolean;
  complemento: boolean;
  voz: boolean;
  URLpelo: string;
  URLojos: string;
  URLcomplemento: string;

  constructor(nombre: string, pass: string, rol: string, pelo: boolean, ojos: boolean, complemento: boolean, voz: boolean
            , URLp: string, URLo: string, URLc: string) {
    this.nombre = nombre;
    this.pass = pass;
    this.rol = rol;
    this.pelo = pelo;
    this. ojos = ojos;
    this.complemento = complemento;
    this.voz = voz;
    this.URLpelo = URLp;
    this.URLojos = URLo;
    this.URLcomplemento = URLc;
  }
}
