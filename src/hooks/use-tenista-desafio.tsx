import { useCallback, useEffect, useState } from "react";
import { ITenista } from "../models";
import { Sexo } from "../models/enums";
import { findAllEager } from '../services/TenistaServices';

export interface ITenistaDesafio {
    listaTenistasDesafiantes1: ITenista[];
    listaTenistasDesafiados1: ITenista[];
    listaTenistasDesafiantes2: ITenista[];
    listaTenistasDesafiados2: ITenista[];
}

export const useTenistaDesafio = (codigoTipoPartida: number | undefined, idTenistaDesafiante1: string | undefined, idTenistaDesafiado1: string | undefined, idTenistaDesafiante2?: string | undefined, idTenistaDesafiado2?: string | undefined): ITenistaDesafio => {
    const [listaTodosTenistas, setListaTodosTenistas] = useState<ITenista[]>([]);
    const [listaTenistasDesafiantes1, setListaTenistasDesafiantes1] = useState<ITenista[]>([]);
    const [listaTenistasDesafiados1, setListaTenistasDesafiados1] = useState<ITenista[]>([]);
    const [listaTenistasDesafiantes2, setListaTenistasDesafiantes2] = useState<ITenista[]>([]);
    const [listaTenistasDesafiados2, setListaTenistasDesafiados2] = useState<ITenista[]>([]);

    const fetchListaTodosTenistas = useCallback(async () => {
        const listaTenistas = await findAllEager();
        setListaTodosTenistas(listaTenistas);
        setListaTenistasDesafiantes1(listaTenistas);
        setListaTenistasDesafiados1(listaTenistas);
        setListaTenistasDesafiantes2(listaTenistas);
        setListaTenistasDesafiados2(listaTenistas);
    }, []);

    useEffect(() => {
        fetchListaTodosTenistas();
    }, [fetchListaTodosTenistas]);

    useEffect(() => {
        setListaTenistasDesafiantes1(
            listaTodosTenistas.filter(t => {
                if(codigoTipoPartida){
                    if(codigoTipoPartida == 1 || codigoTipoPartida == 3){//partida masculina
                        return t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2 && String(t.sexo) != 'Feminino';
                    }else if(codigoTipoPartida == 2 || codigoTipoPartida == 4){ //partida feminina
                        return t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2 && String(t.sexo) != 'Masculino';
                    }else{ //patida mista
                        return t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2 && String(t.sexo) == 'Masculino';
                    }
                }
                return t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2;
            })
        );
        setListaTenistasDesafiados1(
            listaTodosTenistas.filter(t => {
                if(codigoTipoPartida){
                    if(codigoTipoPartida == 1 || codigoTipoPartida == 3){//partida masculina
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2 && String(t.sexo) != 'Feminino';
                    }else if(codigoTipoPartida == 2 || codigoTipoPartida == 4){ //partida feminina
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2 && String(t.sexo) != 'Masculino';
                    }else{ //patida mista
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2&& String(t.sexo) == 'Masculino';
                    }
                }
                return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2;
            })
        );
        setListaTenistasDesafiantes2(
            listaTodosTenistas.filter(t => {
                if(codigoTipoPartida){
                    if(codigoTipoPartida == 1 || codigoTipoPartida == 3){//partida masculina
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiado2 && String(t.sexo) != 'Feminino';
                    }else if(codigoTipoPartida == 2 || codigoTipoPartida == 4){ //partida feminina
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiado2 && String(t.sexo) != 'Masculino';
                    }else{ //patida mista
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiado2 && String(t.sexo) == 'Feminino';
                    }
                }
                return t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2;
            })
        );
        setListaTenistasDesafiados2(
            listaTodosTenistas.filter(t => {
                if(codigoTipoPartida){
                    if(codigoTipoPartida == 1 || codigoTipoPartida == 3){//partida masculina
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && String(t.sexo) != 'Feminino';
                    }else if(codigoTipoPartida == 2 || codigoTipoPartida == 4){ //partida feminina
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && String(t.sexo) != 'Masculino';
                    }else{ //patida mista
                        return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiado1 && t.id != idTenistaDesafiante2 && String(t.sexo) == 'Feminino';
                    }
                }
                return t.id != idTenistaDesafiante1 && t.id != idTenistaDesafiante2 && t.id != idTenistaDesafiado2;
            })
        );
    }, [idTenistaDesafiante1, idTenistaDesafiado1, idTenistaDesafiante2, idTenistaDesafiado2, codigoTipoPartida]);

    return { listaTenistasDesafiantes1, listaTenistasDesafiados1, listaTenistasDesafiantes2, listaTenistasDesafiados2 };
}