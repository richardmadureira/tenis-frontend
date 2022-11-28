import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { IdParam } from "../../../models";
import { obterDesafioPeloId } from '../../../services/DesafioServices';
import { dateFormat, tipoPartidaFormat } from "../../../utils";

export const DesafioDetalhePage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['desafios', id], () => obterDesafioPeloId(id));

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Dados do Desafio {id}</h1>
            <div className='card card-compact card-bordered border-primary'>
                <div className='card-body'>
                    <div className='form-control'>
                        <label id='label-tenista-desafiante1' className='label'>Tenista Desafiante</label>
                        <output id='tenista-desafiante1' className='input input-disabled input-sm input-bordered'>{data?.tenistaDesafiante1?.nome}</output>
                    </div>
                    <div className='form-control'>
                        <label id='label-tenista-desafiado1' className='label'>Tenista Desafiado</label>
                        <output id='tenista-desafiado1' className='input input-disabled input-sm input-bordered'>{data?.tenistaDesafiado1?.nome}</output>
                    </div>
                    <div className='form-control'>
                        <label id='label-nome' className='label'>Tipo de Partida</label>
                        <output id='nome' className='input input-disabled input-sm input-bordered'>{tipoPartidaFormat(data?.codigoTipoPartida)}</output>
                    </div>
                    <div className='form-control'>
                        <label id='label-horario-inicio' className='label'>Data de Início</label>
                        <output id='horario-inicio' className='input input-disabled input-sm input-bordered'>{dateFormat(data?.horarioInicio)}</output>
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-1'>
                <Link to='/desafios' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</Link>
            </div>
        </section>
    );
}