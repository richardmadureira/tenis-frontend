import { AxiosResponse } from "axios";
import { IDesafio, Page } from "../models";
import api from '../utils/api';

export const obterDesafioPeloId = async (id: string | undefined): Promise<IDesafio | null> => {
    const response = await api.get<IDesafio>(`/desafios/${id}`);
    return response.data;
};

export const salvar = async (desafio: IDesafio): Promise<IDesafio> => {
    const response = await api.post<IDesafio, AxiosResponse<IDesafio>>('/desafios', desafio);
    return response.data;
}

export const atualizar = async (desafio: IDesafio): Promise<IDesafio> => {
    const response = await api.put<IDesafio, AxiosResponse<IDesafio>>(`/desafios/${desafio.id}`, desafio);
    return response.data;
}

export const excluirDesafioPeloId = async (id: string | undefined): Promise<void> => {
    await api.delete<any, AxiosResponse<void>>(`/desafios/${id}`);
}

export const findAll = async (options: { pageIndex: number, pageSize: number, filter: IDesafio | undefined }): Promise<Page<IDesafio>> => {
    const response = await api.post<IDesafio, AxiosResponse<Page<IDesafio>>>("/desafios/pesquisa", options.filter, {
        params: {
            page: options.pageIndex,
            size: options.pageSize
        }
    });
    return response.data;
}