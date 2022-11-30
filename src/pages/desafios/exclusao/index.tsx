import { useCallback } from "react";
import { FaArrowLeft, FaCheck, FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IdParam } from "../../../models";
import { excluirDesafioPeloId, obterDesafioPeloId } from "../../../services/DesafioServices";
import { dateFormat } from "../../../utils";

export const DesafioExclusaoPage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['desafios', id], () => obterDesafioPeloId(id));
    const navigate = useNavigate();

    const excluirDesafio = useCallback(async () => {
        await excluirDesafioPeloId(id);
        navigate('/desafios', {
            state: {
                message: {
                    severity: 'success',
                    content: 'Desafio excluído com sucesso'
                }
            }
        });
    }, [id]);

    return (
        <>
            <section className='flex flex-col gap-4'>
                <h1 className='text-primary text-xl'>Exclusão do Desafio {id}</h1>
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
                        <label id='label-horario-previsto' className='label'>Horário Previsto</label>
                        <output id='horario-previsto' className='input input-disabled input-sm input-bordered'>{dateFormat(data?.horarioPrevisto)}</output>
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
                    <h3 className='text-lg font-bold'>Você deseja relamente excluir o desafio?</h3>
                    <p className='py-4 flex gap-1 items-center'><FaExclamationTriangle className='text-warning' />Essa é uma operação irreversível!</p>
                    <div className='flex justify-end gap-1'>
                        <button type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Não</button>
                        <button type='button' onClick={excluirDesafio} className='btn btn-primary btn-sm flex gap-1'><FaCheck />Sim</button>
                    </div>
                </div>
            </div>
        </>
    );
}