import { AxiosResponse } from "axios";
import { ITorneio, Page } from "../models";
import api from '../utils/api';

export const obterTorneioPeloId = async (id: string | undefined): Promise<ITorneio | null> => {
    const response = await api.get<ITorneio>(`/torneios/${id}`);
    return response.data;
};

export const salvar = async (torneio: ITorneio): Promise<ITorneio> => {
    const response = await api.post<ITorneio, AxiosResponse<ITorneio>>('/torneios', torneio);
    return response.data;
}

export const atualizar = async (torneio: ITorneio): Promise<ITorneio> => {
    const response = await api.put<ITorneio, AxiosResponse<ITorneio>>(`/torneios/${torneio.id}`, torneio);
    return response.data;
}

export const excluirTemporadaPeloId = async (id: string | undefined): Promise<void> => {
    await api.delete<any, AxiosResponse<void>>(`/torneios/${id}`);
}

export const findAll = async (options: { pageIndex: number, pageSize: number, filter: ITorneio | undefined }): Promise<Page<ITorneio>> => {
    const response = await api.post<ITorneio, AxiosResponse<Page<ITorneio>>>("/torneios/pesquisa", options.filter, {
        params: {
            page: options.pageIndex,
            size: options.pageSize
        }
    });
    return response.data;
}