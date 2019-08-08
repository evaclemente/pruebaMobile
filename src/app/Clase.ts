export class Clase {

    id: string;
    admin: string;
    avatares: boolean;
    p1: string;
    p2: string;
    p3: string;

    constructor(id: string, admin: string, avatares: boolean, p1: string, p2: string, p3: string) {
      this.id = id;
      this.admin = admin;
      this.avatares = avatares;
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
    }
}
