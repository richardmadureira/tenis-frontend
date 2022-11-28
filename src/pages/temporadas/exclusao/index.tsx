import { useCallback } from "react";
import { FaArrowLeft, FaCheck, FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IdParam } from "../../../models";
import { excluirTemporadaPeloId, obterTemporadaPeloId } from "../../../services/TemporadaServices";
import { dateFormat } from "../../../utils";

export const TemporadaExclusaoPage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['temporadas', id], () => obterTemporadaPeloId(id));
    const navigate = useNavigate();

    const excluirTemporada = useCallback(async () => {
        await excluirTemporadaPeloId(id);
        navigate('/temporadas', {
            state: {
                message: {
                    severity: 'success',
                    content: 'Temporada excluída com sucesso'
                }
            }
        });
    }, [id]);

    return (
        <>
            <section className='flex flex-col gap-4'>
                <h1 className='text-primary text-xl'>Exclusão da Temporada {id}</h1>
                <div className='card card-compact card-bordered border-primary'>
                <div className='card-body'>
                    <div className='form-control'>
                        <label id='label-nome' className='label'>Descrição</label>
                        <output id='nome' className='input input-disabled input-sm input-bordered'>{data?.descricao}</output>
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
                </div>
            </div>
                <div className='flex justify-end gap-1'>
                    <button type='button' className='btn btn-primary btn-sm btn-outline flex gap-1'><FaArrowLeft />Voltar</button>
                    <label htmlFor='modal-exclusao' className='btn btn-primary btn-sm flex gap-1'><FaTrashAlt />Excluir</label>
                </div>
            </section>
            <input type='checkbox' id='modal-exclusao' className='modal-toggle' />
            <div className='modal'>
                <div className='modal-box relative'>
                    <label htmlFor='modal-exclusao' className='btn btn-sm btn-circle absolute right-2 top-2'>✕</label>
                    <h3 className='text-lg font-bold'>Você deseja relamente excluir a temporada?</h3>
                    <p className='py-4 flex gap-1 items-center'><FaExclamationTriangle className='text-warning' />Essa é uma operação irreversível!</p>
                    <div className='flex justify-end gap-1'>
                        <button type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Não</button>
                        <button type='button' onClick={excluirTemporada} className='btn btn-primary btn-sm flex gap-1'><FaCheck />Sim</button>
                    </div>
                </div>
            </div>
        </>
    );
}