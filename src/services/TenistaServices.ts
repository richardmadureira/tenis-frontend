import { AxiosResponse } from "axios";
import { ITenista, Page } from "../models";
import { sexoFormat } from "../utils";
import api from '../utils/api';

export const obterTenistaPeloId = async (id: string | undefined): Promise<ITenista | null> => {
    const response = await api.get(`/tenistas/${id}`);
    return response.data;
};

export const salvarTenista = async (tenista: ITenista & {avatarFileName: string}): Promise<ITenista> => {
    const formData = new FormData();
    const { nome, email, codigoSexo, dataNascimento, avatar, avatarFileName } = tenista;
    console.log(tenista);
    formData.append("nome", nome as string);
    formData.append("email", email as string);
    formData.append("codigoSexo", String(codigoSexo));
    formData.append("sexo", sexoFormat(codigoSexo));
    formData.append("dataNascimento", dataNascimento?.toISOString() as string);
    formData.append("avatar", avatar, avatarFileName);

    const response = await api.post('/tenistas', formData)
    return response.data;
}

export const atualizarTenista = async (tenista: ITenista): Promise<ITenista> => {
    const response = await api.put(`/tenistas/${tenista.id}`, tenista)
    return response.data;
}

export const excluirTenistaPeloId = async (id: string | undefined): Promise<void> => {
    await api.delete<any, void>(`/tenistas/${id}`);
}

export const obterListaTodosTenistas = async (): Promise<ITenista[]> => {
    return await api.get<any, ITenista[]>('/tenistas');
}

export async function findAll(options: { pageIndex: number, pageSize: number, filter: ITenista | undefined }): Promise<Page<ITenista>> {
    const response = await api.post<ITenista, AxiosResponse<Page<ITenista>>>("/tenistas/pesquisa", options.filter, {
        params: {
            page: options.pageIndex,
            size: options.pageSize
        }
    });
    return response.data;
}

export async function findAllEager(): Promise<ITenista[]> {
    const response = await api.get<void, AxiosResponse<ITenista[]>>("/tenistas/pesquisa");
    return response.data;
}