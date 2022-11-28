import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaCheck, FaEraser, FaTimes } from "react-icons/fa";
import ReactSelect from 'react-select';
import { ITenista, ITorneio } from '../../../models';
import { obterListaTodosTenistas } from '../../../services/TenistaServices';
import { novoTorneioSchema } from '../../../utils/yup-schema';

export const TorneioNovoPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ITorneio>({ defaultValues: {}, resolver: yupResolver(novoTorneioSchema) });
    const [listaOptionsTenistas, setListaOptionsTenistas] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const listaRetorno = await obterListaTodosTenistas();
            setListaOptionsTenistas(listaRetorno.map((t: ITenista) => ({ label: t.nome, value: t.id })));
        }
        fetchData();
    })

    const onSave = (torneio: ITorneio) => {
        console.log('torneio a salvar', torneio);
    }

    const onReset = () => {
        reset({});
    }

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Novo Torneio</h1>
            <form className='card card-compact card-bordered shadow' noValidate onSubmit={handleSubmit(onSave)} encType="multipart/form-data">
                <div className='card-body'>
                    <div className='grid md:grid-cols-4 gap-2'>
                        <div className='form-control w-full md:col-span-3'>
                            <label id='label-nome' className='label'>
                                <span className='label-text'>Nome</span>
                            </label>
                            <input id='nome' placeholder='Ex.: Torneio de Tênis da ABB 2020' {...register('nome', { required: true })} autoFocus title='Informe aqui o nome do torneio' required className='input input-sm input-primary' />
                            {errors.nome &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.nome.message}</span>
                            }
                        </div>
                        <div className='form-control w-full'>
                            <label id='label-horario-previsto' className='label'>
                                <span className='label-text'>Horário Previsto</span>
                            </label>
                            <input id='horario-previsto' type='date' {...register('horarioPrevisto', { valueAsDate: true })} title='Informe aqui o horário previsto para início do torneio' placeholder='Ex.: 01/01/2022' required className='input input-sm input-primary' />
                            {errors.horarioPrevisto &&
                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.horarioPrevisto.message}</span>
                            }
                        </div>
                    </div>
                    <div className='flex justify-end gap-1'>
                        <button id='btn-reset' type='reset' onClick={onReset} className='btn btn-primary btn-outline btn-sm flex gap-1'><FaEraser />Limpar</button>
                        <button id='btn-cancel' type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Cancelar</button>
                        <button id='btn-salve' type='submit' className='btn btn-primary btn-sm flex gap-1'><FaCheck />Salvar</button>
                    </div>
                </div>
                <div className='form-control'>
                    <label id='label-tenistas' htmlFor='tenistas'>Tenistas</label>
                    <ReactSelect id='tenistas' options={listaOptionsTenistas} className='select select-input select-sm select-primary' isMulti closeMenuOnSelect={false} />
                </div>
            </form>

        </section>
    );
}