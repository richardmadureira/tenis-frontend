import { useCallback } from "react";
import { FaArrowLeft, FaCheck, FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IdParam } from "../../../models";
import { excluirTenistaPeloId, obterTenistaPeloId } from "../../../services/TenistaServices";
import { dateFormat, sexoFormat } from "../../../utils";

export const TenistaExclusaoPage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['tenista', id], () => obterTenistaPeloId(id));
    const navigate = useNavigate();

    const excluirTenista = useCallback(async () => {
        await excluirTenistaPeloId(id);
        navigate('/tenistas', {
            state: {
                message: {
                    severity: 'success',
                    content: 'Tenista excluído com sucesso'
                }
            }
        });
    }, [id]);

    return (
        <>
            <section className='flex flex-col gap-4'>
                <h1 className='text-primary text-xl'>Exclusão do Tenista {id}</h1>
                <div className='card card-compact card-bordered border-primary'>
                    <div className='card-body'>
                        <div className='form-control'>
                            <label id='label-nome' className='label'>Nome</label>
                            <output id='nome' className='input input-disabled input-sm input-bordered'>{data?.nome}</output>
                        </div>
                        <div className='form-control'>
                            <label id='label-email' className='label'>Email</label>
                            <output id='email' className='input input-disabled input-sm input-bordered'>{data?.email}</output>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='form-control'>
                                <label id='label-data-nascimento' className='label'>Data de Nascimento</label>
                                <output id='data-nascimento' className='input input-disabled input-sm input-bordered'>{dateFormat(data?.dataNascimento)}</output>
                            </div>
                            <div className='form-control'>
                                <label id='label-data-nascimento' className='label'>Sexo</label>
                                <output id='data-nascimento' className='input input-disabled input-sm input-bordered'>{sexoFormat(data?.codigoSexo)}</output>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end gap-1'>
                    <Link to='/tenistas' className='btn btn-primary btn-sm btn-outline flex gap-1'><FaArrowLeft />Voltar</Link>
                    <label htmlFor='modal-exclusao' className='btn btn-primary btn-sm outline flex gap-1'><FaTrashAlt />Excluir</label>
                </div>
            </section>
            <input type='checkbox' id='modal-exclusao' className='modal-toggle' />
            <div className='modal'>
                <div className='modal-box relative'>
                    <label htmlFor='modal-exclusao' className='btn btn-sm btn-circle absolute right-2 top-2'>✕</label>
                    <h3 className='text-lg font-bold'>Você deseja relamente excluir o tenista?</h3>
                    <p className='py-4 flex gap-1 items-center'><FaExclamationTriangle className='text-warning' /> Essa é uma operação irreversível!</p>
                    <div className='flex justify-end gap-1'>
                        <button type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Não</button>
                        <button type='button' onClick={excluirTenista} className='btn btn-primary btn-sm flex gap-1'><FaCheck />Sim</button>
                    </div>
                </div>
            </div>
        </>
    );
}