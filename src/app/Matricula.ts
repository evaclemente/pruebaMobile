export class Matricula {

    nota: number;
    id: number;
    idAlumno: string;
    idAsignatura: string;
    pelo: boolean;
    ojos: boolean;
    complemento: boolean;
    URLpelo: string;
    URLojos: string;
    URLcomplemento: string;

    constructor(nota: number, id: number, idAlumno: string, idAsignatura: string, pelo: boolean, ojos: boolean, complemento: boolean
              , URLp: string, URLo: string, URLc: string) {

        this.nota = nota;
        this.id = id ;
        this.idAlumno = idAlumno;
        this.idAsignatura = idAsignatura;
        this.pelo = pelo;
        this. ojos = ojos;
        this.complemento = complemento;
        this.URLpelo = URLp;
        this.URLojos = URLo;
        this.URLcomplemento = URLc;
    }
}