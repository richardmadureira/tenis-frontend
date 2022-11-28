import { useEffect, useState } from "react";
import { ITemporada } from "../models";
import { findAllAtiva } from '../services/TemporadaServices';

export const useTemporadasAtivas = () => {
    const [listaTemporadas, setListaTemporadas] = useState<ITemporada[]>([]);

    useEffect(() => {
        findAllAtiva().then((res) => {
            setListaTemporadas(res);
        });
    }, []);

    return listaTemporadas;
}