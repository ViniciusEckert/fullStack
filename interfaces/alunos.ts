import { CursoData } from "./cursos";

export interface AlunoData {
    id: number;
    nome: string;
    idade: number;
    cpf: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Aluno extends AlunoData {
    cursos: CursoData[];
}