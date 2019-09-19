export class Clase {

    id: string;
    admin: string;
    avatares: boolean;
    familia: string;
    busto: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;

    constructor(id: string, admin: string, avatares: boolean, familia: string, busto: string, p1: string, p2: string, p3: string
              , p4: string) {
      this.id = id;
      this.admin = admin;
      this.avatares = avatares;
      this.familia = familia;
      this.busto = busto;
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
      this.p4 = p4;
    }
}
