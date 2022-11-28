import { Sexo, TipoPartida } from "../models/enums";

const ISO_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

export const dateFormat = (date: Date | string | undefined): string => {
    if (date != null) {
        if (date instanceof Date) {
            return Intl.DateTimeFormat("pt-br").format(date);
        } else {
            return date.toString();
            // throw new Error('Data informada não é uma instância de Date')
        }
    }
    return '--/--/----';
}

export const sexoFormat = (codigoSexo: number | undefined): string => {
    if (codigoSexo) {
        if (codigoSexo === Sexo.Masculino) {
            return 'Masculino';
        } else if (codigoSexo === Sexo.Feminino) {
            return 'Feminino';
        }
    }
    return '--';
}

export const tipoPartidaFormat = (tipoPartida: any): string => {
    switch (tipoPartida) {
        case TipoPartida.SIMPLES_MASCULINA:
            return "Simples - Masculina";
        case TipoPartida.SIMPLES_FEMININA:
            return "Simples - Feminina";
        case TipoPartida.DUPLAS_MASCULINA:
            return "Duplas - Masculina";
        case TipoPartida.DUPLAS_FEMININA:
            return "Duplas - Feminina";
        case TipoPartida.DUPLAS_MISTA:
            return "Duplas - Mista";
        default:
            return '';
            // throw new Error('tipo de partida inválido: ' + tipoPartida);
    }
}

export const isIsoDateString = (value: any): boolean => {
    return value && typeof value === "string" && ISO_DATE_FORMAT.test(value);
}

export const handleDates = (body: any) => {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) body[key] = parseISODate(value);
        else if (typeof value === "object") handleDates(value);
    }
}

export const parseISODate = (value: string): Date => {
    return new Date(Date.parse(value));
}