import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaEraser, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import ptBR from 'date-fns/locale/pt-BR';
import ReactDatePicker from 'react-datepicker';
import { ITemporada } from '../../../models';
import { salvar } from '../../../services/TemporadaServices';
import { novaTemporadaSchema } from '../../../utils/yup-schema';

import "react-datepicker/dist/react-datepicker.css";

export const TemporadaNovaPage = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ITemporada>({ defaultValues: {}, resolver: yupResolver(novaTemporadaSchema) });
    const navigate = useNavigate();

    const onSave = async (temporada: ITemporada) => {
        console.log('temporada a salvar', temporada);
        const temporadaSalva = await salvar(temporada);
        navigate(`/temporadas/detalhe/${temporadaSalva.id}`, {
            state: {
                message: {
                    severity: 'success', content: 'Temporada cadastrada com sucesso'
                }
            }
        })
    }

    const onReset = () => {
        reset({});
    }

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Nova Temporada</h1>
            <form className='card card-compact card-bordered shadow' noValidate onSubmit={handleSubmit(onSave)}>
                <div className='card-body'>
                    <div className='form-control w-full md:col-span-3'>
                        <label id='label-descricao' className='label'>
                            <span className='label-text'>Descrição</span>
                        </label>
                        <input id='descricao' placeholder='Ex.: Temporada de desafios de tênis da AABB 2020' {...register('descricao', { required: true })} autoFocus title='Informe aqui uma descrição da temporada' required className='input input-sm input-primary' />
                        {errors.descricao &&
                            <span className="label-text-alt alert alert-error py-1 my-1">{errors.descricao.message}</span>
                        }
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='form-control w-full'>
                            <label id='label-horario-inicio' className='label'>
                                <span className='label-text'>Data de Início</span>
                            </label>
                            <Controller
                                render={ref => (
                                    <ReactDatePicker
                                        selected={ref.field.value ? new Date(Number(ref.field.value)) : undefined}
                                        onChange={(date: Date) => ref.field.onChange(date)}
                                        dateFormat="dd/MM/yyyy"
                                        locale={ptBR}
                                        isClearable={true}
                                        placeholderText="Ex.: 01/01/2022"
                                        className='input input-sm input-bordered input-primary w-full'
                                    />
                                )}
                                name="horarioInicio"
                                control={control}
                            />
                            {errors.horarioInicio &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.horarioInicio.message}</span>
                            }
                        </div>
                        <div className='form-control w-full'>
                            <label id='label-horario-termino' className='label'>
                                <span className='label-text'>Data de Término</span>
                            </label>
                            <Controller
                                render={ref => (
                                    <ReactDatePicker
                                        selected={ref.field.value ? new Date(Number(ref.field.value)) : undefined}
                                        onChange={(date: Date) => ref.field.onChange(date)}
                                        locale={ptBR}
                                        isClearable={true}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Ex.: 31/12/2022"
                                        className='input input-sm input-bordered input-primary w-full'
                                    />
                                )}
                                name="horarioTermino"
                                control={control}
                            />
                            {errors.horarioTermino &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.horarioTermino.message}</span>
                            }
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