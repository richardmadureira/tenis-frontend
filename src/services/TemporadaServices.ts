import { AxiosResponse } from "axios";
import { ITemporada, Page } from "../models";
import api from '../utils/api';

export const obterTemporadaPeloId = async (id: string | undefined): Promise<ITemporada | null> => {
    const response = await api.get<ITemporada>(`/temporadas/${id}`);
    return response.data;
};

export const salvar = async (temporada: ITemporada): Promise<ITemporada> => {
    const response = await api.post<ITemporada, AxiosResponse<ITemporada>>('/temporadas', temporada);
    return response.data;
}

export const atualizar = async (temporada: ITemporada): Promise<ITemporada> => {
    const response = await api.put<ITemporada, AxiosResponse<ITemporada>>(`/temporadas/${temporada.id}`, temporada);
    return response.data;
}

export const excluirTemporadaPeloId = async (id: string | undefined): Promise<void> => {
    await api.delete<any, AxiosResponse<void>>(`/temporadas/${id}`);
}

export const findAll = async (options: { pageIndex: number, pageSize: number, filter: ITemporada | undefined }): Promise<Page<ITemporada>> => {
    const response = await api.post<ITemporada, AxiosResponse<Page<ITemporada>>>("/temporadas/pesquisa", options.filter, {
        params: {
            page: options.pageIndex,
            size: options.pageSize
        }
    });
    return response.data;
}

export const findAllAtiva = async(): Promise<ITemporada[]> => {
    const response = await api.get<ITemporada[]>("/temporadas/ativas");
    return response.data;
}