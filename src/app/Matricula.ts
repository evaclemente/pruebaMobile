export class Matricula {

    nota: number;
    id: number;
    idAlumno: string;
    idAsignatura: string;

    constructor(nota: number, id: number, idAlumno: string, idAsignatura: string) {

        this.nota = nota;
        this.id = id ;
        this.idAlumno = idAlumno;
        this.idAsignatura = idAsignatura;
    }
}