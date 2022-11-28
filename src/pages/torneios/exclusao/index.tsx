import { useCallback } from "react";
import { FaArrowLeft, FaCheck, FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IdParam } from "../../../models";
import { excluirTorneioPeloId, obterTorneioPeloId } from "../../../services/TorneioServices";

export const TorneioExclusaoPage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['tenista', id], () => obterTorneioPeloId(id));
    const navigate = useNavigate();

    const excluirTorneio = useCallback(async () => {
        await excluirTorneioPeloId(id);
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
            <section>
                <h1 className='text-primary text-xl'>Exclusão do Torneio {id}</h1>
                <div className='flex justify-end gap-1'>
                    <button type='button' className='btn btn-primary btn-sm btn-outline flex gap-1'><FaArrowLeft />Voltar</button>
                    <label htmlFor='modal-exclusao' className='btn btn-primary btn-sm flex gap-1'><FaTrashAlt />Excluir</label>
                </div>
            </section>
            <input type='checkbox' id='modal-exclusao' className='modal-toggle' />
            <div className='modal'>
                <div className='modal-box relative'>
                    <label htmlFor='modal-exclusao' className='btn btn-sm btn-circle absolute right-2 top-2'>✕</label>
                    <h3 className='text-lg font-bold'>Você deseja relamente excluir o torneio?</h3>
                    <p className='py-4 flex gap-1 items-center'><FaExclamationTriangle className='text-warning' />Essa é uma operação irreversível!</p>
                    <div className='flex justify-end gap-1'>
                        <button type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Não</button>
                        <button type='button' onClick={excluirTorneio} className='btn btn-primary btn-sm flex gap-1'><FaCheck />Sim</button>
                    </div>
                </div>
            </div>
        </>
    );
}