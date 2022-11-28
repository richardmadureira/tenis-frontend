import { useCallback, useEffect, useState } from 'react';
import { ITenista } from '../models';
import { findAllEager } from '../services/TenistaServices';

export const useTenistas = (): ITenista[] => {
    const [listaTenistas, setListaTenistas] = useState<ITenista[]>([]);

    const fetchData = useCallback(async () => {
        findAllEager().then(res => {
            console.log(res);
            setListaTenistas(res);
        });
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return listaTenistas;
}