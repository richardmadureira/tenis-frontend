import { yupResolver } from '@hookform/resolvers/yup';
import ptBR from 'date-fns/locale/pt-BR';
import { useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaEraser, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useTemporadasAtivas } from '../../../hooks/use-temporadas-ativas';
import { useTenistaDesafio } from '../../../hooks/use-tenista-desafio';
import { IDesafio } from "../../../models";
import { salvar } from '../../../services/DesafioServices';
import { novoDesafioSchema } from '../../../utils/yup-schema';

const DEFAULT_VALUES = {}

export const DesafioNovoPage = () => {
    const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<IDesafio>({ defaultValues: DEFAULT_VALUES, resolver: yupResolver(novoDesafioSchema) });
    const navigate = useNavigate();
    const codigoTipoPartida = watch('codigoTipoPartida');
    const listaTemporadasAtivas = useTemporadasAtivas();

    const idTenistaDesafiante1 = watch('idTenistaDesafiante1');
    const idTenistaDesafiado1 = watch('idTenistaDesafiado1');
    const idTenistaDesafiante2 = watch('idTenistaDesafiante2');
    const idTenistaDesafiado2 = watch('idTenistaDesafiado2');

    const { listaTenistasDesafiantes1, listaTenistasDesafiados1, listaTenistasDesafiantes2, listaTenistasDesafiados2 } = useTenistaDesafio(codigoTipoPartida, idTenistaDesafiante1, idTenistaDesafiado1, idTenistaDesafiante2, idTenistaDesafiado2);

    const onSave = useCallback((desafio: IDesafio) => {
        salvar(desafio).then(desafioSalvo => {
            navigate(`/desafios/detalhe/${desafioSalvo.id}`, {
                state: {
                    message: {
                        severity: 'success', content: 'Desafio cadastrado com sucesso'
                    }
                }
            })
        });
        
    }, []);

    const onReset = useCallback(() => {
        reset({});
    }, []);

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Novo Desafio</h1>
            <form className='card card-compact card-bordered shadow' noValidate onSubmit={handleSubmit(onSave)}>
                <div className='card-body'>
                    <div className='form-control'>
                        <label id='label-temporadas' className='label' htmlFor='tipo-temporadas'>
                            <span className='label-text'>Temporada</span>
                        </label>
                        <select id='temporada' defaultValue='' {...register('idTemporada', { required: true })} title='Informe aqui  tipo de partida' required className='select select-sm select-primary' >
                            <option value='' disabled>Selecione</option>
                            {listaTemporadasAtivas.map(t => <option key={t.id} value={t.id}>{t.descricao}</option>)}
                        </select>
                        {errors.idTemporada && <span className="label-text-alt alert alert-error py-1 my-1">{errors.idTemporada.message}</span>}
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='form-control'>
                            <label id='label-tipo-partida' className='label' htmlFor='tipo-partida'>
                                <span className='label-text'>Tipo de Partida</span>
                            </label>
                            <select id='tipo-partida' defaultValue='-1' {...register('codigoTipoPartida', { required: true, valueAsNumber: true })} title='Informe aqui  tipo de partida' required className='select select-sm select-primary' >
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
                        <div className='form-control w-full'>
                            <label id='label-data-nascimento' className='label'>
                                <span className='label-text'>Horário Previsto</span>
                            </label>
                            <Controller
                                render={ref => (<ReactDatePicker selected={ref.field.value ? new Date(Number(ref.field.value)) : undefined} onChange={(date: Date) => ref.field.onChange(date)} dateFormat="dd/MM/yyyy" locale={ptBR} isClearable={true} placeholderText="Ex.: 01/01/2022" className='input input-sm input-bordered input-primary w-full' />)}
                                name="horarioPrevisto" control={control} />
                            {errors.horarioPrevisto && <span className="label-text-alt alert alert-error py-1 my-1">{errors.horarioPrevisto.message}</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-9 gap-2'>
                        <div className='col-span-4'>
                            <div className='form-control'>
                                <label id='label-tenista-desafiante1' className='label' htmlFor='tenista-desafiante1'>
                                    <span className='label-text'>Tenista Desafiante 1</span>
                                </label>
                                <select id='tenista-desafiante1' defaultValue='' {...register('idTenistaDesafiante1', { required: true })} title='Informe aqui o tenista desafiante' required className='select select-sm select-primary' >
                                    <option value='' disabled>Selecione</option>
                                    {listaTenistasDesafiantes1.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                                </select>
                                {errors.idTenistaDesafiante1 && <span className="label-text-alt alert alert-error py-1 my-1">{errors.idTenistaDesafiante1.message}</span>}
                            </div>
                            {(codigoTipoPartida && codigoTipoPartida >= 3) && <div className='form-control'>
                                <label id='label-tenista-desafiante2' className='label' htmlFor='tenista-desafiante2'>
                                    <span className='label-text'>Tenista Desafiante 2</span>
                                </label>
                                <select id='tenista-desafiante2' defaultValue='' {...register('idTenistaDesafiante2', { required: true })} title='Informe aqui o tenista desafiante' required className='select select-sm select-primary' >
                                    <option value='' disabled>Selecione</option>
                                    {listaTenistasDesafiantes2.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                                </select>
                                {errors.idTenistaDesafiante2 &&
                                    <span className="label-text-alt alert alert-error py-1 my-1">{errors.idTenistaDesafiante2.message}</span>
                                }
                            </div>}
                        </div>
                        <div className={`flex justify-center ${(codigoTipoPartida && codigoTipoPartida >= 3) ? 'items-center':'items-end'}`}><FaTimes size={50} className='text-primary-focus' /></div>
                        <div className='col-span-4'>
                            <div className='form-control'>
                                <label id='label-tenista-desafiado1' className='label' htmlFor='tenista-desafiado1'>
                                    <span className='label-text'>Tenista Desafiado 1</span>
                                </label>
                                <select id='tenista-desafiado1' defaultValue='' {...register('idTenistaDesafiado1', { required: true })} title='Informe aqui o tenista a ser desafiado' required className='select select-sm select-primary' >
                                    <option value='' disabled>Selecione</option>
                                    {listaTenistasDesafiados1.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                                </select>
                                {errors.idTenistaDesafiado1 &&
                                    <span className="label-text-alt alert alert-error py-1 my-1">{errors.idTenistaDesafiado1.message}</span>
                                }
                            </div>
                            {(codigoTipoPartida && codigoTipoPartida >= 3) && <div className='form-control'>
                                <label id='label-tenista-desafiado2' className='label' htmlFor='tenista-desafiado2'>
                                    <span className='label-text'>Tenista Desafiado 2</span>
                                </label>
                                <select id='tenista-desafiado2' defaultValue='' {...register('idTenistaDesafiado2', { required: true })} title='Informe aqui o tenista a ser desafiado' required className='select select-sm select-primary' >
                                    <option value='' disabled>Selecione</option>
                                    {listaTenistasDesafiados2.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                                </select>
                                {errors.idTenistaDesafiado2 && <span className="label-text-alt alert alert-error py-1 my-1">{errors.idTenistaDesafiado2.message}</span>}
                            </div>}
                        </div>
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