import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { FaCheck, FaEraser, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IDesafio } from "../../../models";
import { novoDesafioSchema } from '../../../utils/yup-schema';

const DEFAULT_VALUES = {}

export const DesafioNovoPage = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<IDesafio>({ defaultValues: DEFAULT_VALUES, resolver: yupResolver(novoDesafioSchema) });
    const navigate = useNavigate();
    const codigoTipoPartida = watch('codigoTipoPartida');

    const onSave = (desafio: IDesafio) => {
        console.log('desafio a salvar', desafio);
        navigate('/desafios/detalhe/1', {
            state: {
                message: {
                    severity: 'success', content: 'Desafio cadastrado com sucesso'
                }
            }
        })
    }

    const onReset = () => {
        reset({});
    }

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Novo Desafio</h1>
            <form className='card card-compact card-bordered shadow' noValidate onSubmit={handleSubmit(onSave)}>
                <div className='card-body'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='form-control'>
                            <label id='label-tipo-partida' className='label' htmlFor='tipo-partida'>
                                <span className='label-text'>Tipo de Partida</span>
                            </label>
                            <select id='tipo-partida' {...register('codigoTipoPartida', { required: true, valueAsNumber: true })} title='Informe aqui  tipo de partida' required className='select select-sm select-primary' >
                                <option value='-1' disabled>Selecione</option>
                                <option value='1' >Simples - Masculino</option>
                                <option value='2' >Simples - Feminino</option>
                                <option value='3' >Duplas - Masculino</option>
                                <option value='4' >Duplas - Feminino</option>
                                <option value='5' >Duplas - Misto</option>
                            </select>
                            {errors.codigoTipoPartida &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.codigoTipoPartida.message}</span>
                            }
                        </div>
                        <div className='form-control'>
                            <label id='label-horario-previsto' className='label'>
                                <span className='label-text'>Horário Previsto</span>
                            </label>
                            <input id='horario-previsto' type='date' {...register('horarioPrevisto', { valueAsDate: true })} title='Informe aqui o horário previsto para o desafio' placeholder='Ex.: 01/01/2022' required className='input input-sm input-primary' />
                            {errors.horarioPrevisto &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.horarioPrevisto.message}</span>
                            }
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='form-control'>
                            <label id='label-tenista-desafiante1' className='label' htmlFor='tenista-desafiante1'>
                                <span className='label-text'>Tenista Desafiante 1</span>
                            </label>
                            <select id='tenista-desafiante1' {...register('tenistaDesafiante1', { required: true, valueAsNumber: true  })} title='Informe aqui o tenista desafiante' required className='select select-sm select-primary' >
                                <option value='-1' disabled>Selecione</option>
                                <option value='1'>Tenista 1</option>
                                <option value='2'>Tenista 2</option>
                                <option value='3'>Tenista 3</option>
                            </select>
                            {errors.tenistaDesafiante1 &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.tenistaDesafiante1.message}</span>
                            }
                        </div>
                        {(codigoTipoPartida && codigoTipoPartida > 2) && <div className='form-control'>
                            <label id='label-tenista-desafiante2' className='label' htmlFor='tenista-desafiante2'>
                                <span className='label-text'>Tenista Desafiante 2</span>
                            </label>
                            <select id='tenista-desafiante2' {...register('tenistaDesafiante2', { required: true, valueAsNumber: true  })} title='Informe aqui o tenista desafiante' required className='select select-sm select-primary' >
                                <option value='-1' disabled>Selecione</option>
                                <option value='1'>Tenista 1</option>
                                <option value='2'>Tenista 2</option>
                                <option value='3'>Tenista 3</option>
                            </select>
                            {errors.tenistaDesafiante2 &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.tenistaDesafiante2.message}</span>
                            }
                        </div>}
                        <div className='form-control'>
                            <label id='label-tenista-desafiado1' className='label' htmlFor='tenista-desafiado1'>
                                <span className='label-text'>Tenista Desafiado 1</span>
                            </label>
                            <select id='tenista-desafiado1' {...register('tenistaDesafiado1', { required: true, valueAsNumber: true  })} title='Informe aqui o tenista a ser desafiado' required className='select select-sm select-primary' >
                                <option value='-1' disabled>Selecione</option>
                                <option id='1'>Tenista 1</option>
                                <option id='2'>Tenista 2</option>
                                <option id='4'>Tenista 3</option>
                            </select>
                            {errors.tenistaDesafiado1 &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.tenistaDesafiado1.message}</span>
                            }
                        </div>
                        {(codigoTipoPartida && codigoTipoPartida > 2) && <div className='form-control'>
                            <label id='label-tenista-desafiado2' className='label' htmlFor='tenista-desafiado2'>
                                <span className='label-text'>Tenista Desafiado 2</span>
                            </label>
                            <select id='tenista-desafiado2' {...register('tenistaDesafiado2', { required: true, valueAsNumber: true  })} title='Informe aqui o tenista a ser desafiado' required className='select select-sm select-primary' >
                                <option value='' disabled>Selecione</option>
                                <option id='1'>Tenista 1</option>
                                <option id='2'>Tenista 2</option>
                                <option id='4'>Tenista 3</option>
                            </select>
                            {errors.tenistaDesafiado2 &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.tenistaDesafiado2.message}</span>
                            }
                        </div>}
                    </div>
                    <div className='flex justify-end gap-1'>
                        <button id='btn-reset' type='reset' onClick={onReset} className='btn btn-primary btn-outline btn-sm flex gap-1'><FaEraser />Limpar</button>
                        <button id='btn-cancel' type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Cancelar</button>
                        <button id='btn-salve' type='submit' className='btn btn-primary btn-sm flex gap-1'><FaCheck />Salvar</button>
                    </div>
                </div>
            </form>
        </section>
    );
}