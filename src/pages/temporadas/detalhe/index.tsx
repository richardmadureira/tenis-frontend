import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { IdParam } from "../../../models";

import { obterTemporadaPeloId } from '../../../services/TemporadaServices';
import { dateFormat, simOuNaoFormat } from "../../../utils";

export const TemporadaDetalhePage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['temporadas', id], () => obterTemporadaPeloId(id));

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Dados da Temporada {id}</h1>
            <div className='card card-compact card-bordered border-primary'>
                <div className='card-body'>
                    <div className='grid grid-cols-5 gap-2'>
                        <div className='form-control col-span-4'>
                            <label id='label-nome' className='label'>Descrição</label>
                            <output id='nome' className='input input-disabled input-sm input-bordered'>{data?.descricao}</output>
                        </div>
                        <div className='form-control'>
                            <label id='label-ano' className='label'>Ano</label>
                            <output id='ano' className='input input-disabled input-sm input-bordered'>{data?.ano}</output>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='form-control'>
                            <label id='label-horario-inicio' className='label'>Data de Início</label>
                            <output id='horario-inicio' className='input input-disabled input-sm input-bordered'>{dateFormat(data?.horarioInicio)}</output>
                        </div>
                        <div className='form-control'>
                            <label id='label-horario-termino' className='label'>Data de Término</label>
                            <output id='horario-termino' className='input input-disabled input-sm input-bordered'>{dateFormat(data?.horarioTermino)}</output>
                        </div>
                    </div>
                    <div className='form-control'>
                        <label id='label-ativa' className='label'>Ativa</label>
                        <output id='ativa' className='input input-disabled input-sm input-bordered'>{simOuNaoFormat(data?.ativa)}</output>
                    </div>
                </div>

            </div>
            <div className='flex justify-end gap-1'>
                <Link to='/temporadas' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</Link>
            </div>
        </section>
    );
}