import { Sexo } from "./enums";

export interface IDesafio {
    id?: string;
    codigoTipoPartida?: number;
    tenistaDesafiante1?: ITenista;
    tenistaDesafiante2?: ITenista;
    tenistaDesafiado1?: ITenista;
    tenistaDesafiado2?: ITenista;
    horarioPrevisto?: Date;
    horarioInicio?: Date;
    horarioTermino?: Date;
}

export type IdParam = {
    id?: string;
}

export interface IMessage {
    severity?: 'success' | 'error' | 'warning' | 'info';
    content?: string;
}

export interface IRanking {
    id?: string;
    posicao?: number;
    tenista?: ITenista;
    totalDesafiosRealizados?: number;
    totalDesafiosRecebidos?: number;
    totalDesafiosVencidos?: number;
    totalDesafiosPerdidos?: number;
    temporada?: ITemporada;
}

export interface ITemporada {
    id?: string;
    descricao?: string;
    horarioInicio?: Date;
    horarioTermino?: Date;
}


export interface ITenista {
    id?: string;
    nome?: string;
    email?: string;
    dataNascimento?: Date;
    codigoSexo?: 1 | 2;
    sexo?: Sexo;
    avatarUrl?: string;
    avatar?: any;
}

export interface Page<T> {
    content: T[],
    totalElements: number,
    pageCount: number;
}

export interface ITorneio {
    id?: string;
    nome?: string;
    horarioPrevisto?: Date;
    horarioInicio?: Date;
    horarioTermino?: Date;
}