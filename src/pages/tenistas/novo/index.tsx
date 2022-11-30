import { yupResolver } from '@hookform/resolvers/yup';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { Cropper } from 'react-cropper';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaCheck, FaEraser, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import { ITenista } from '../../../models';
import { salvarTenista } from '../../../services/TenistaServices';
import { novoTenistaSchema } from '../../../utils/yup-schema';

import "cropperjs/dist/cropper.css";
import "react-datepicker/dist/react-datepicker.css";

export const TenistaNovoPage = () => {
    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<ITenista & {avatarFileName: string}>({ defaultValues: {}, resolver: yupResolver(novoTenistaSchema) });
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState<any>();
    const [avatarFileName, setAvatarFileName] = useState();

    const navigate = useNavigate();

    const onSave = async (tenista: ITenista & {avatarFileName: string}) => {
        tenista.avatarFileName = avatarFileName || '';
        const tenistaSalvo = await salvarTenista(tenista);
        reset(tenistaSalvo);
        navigate(`/tenistas/detalhe/${tenistaSalvo.id}`, { state: { message: { severity: 'success', content: 'Tenista salvo com sucesso.' } } });
    }

    const openModal = () => {
        document.querySelector('#anchor-modal-foto')?.dispatchEvent(new MouseEvent('click', { metaKey: true }));
    }

    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
        setAvatarFileName(files[0].name);
        openModal();
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            cropper.getCroppedCanvas().toBlob((blob:any) => setValue('avatar', blob));
        }
    };

    const onReset = () => {
        reset({});
    }

    return (
        <>
            <section className='flex flex-col gap-4'>
                <h1 className='text-primary text-xl'>Novo Tenista</h1>
                <form className='card card-compact card-bordered shadow' noValidate onSubmit={handleSubmit(onSave)}>
                    <div className='card-body'>
                        <div className="form-control Crop-Controls">
                            <label id='label-avatar' htmlFor='avatar' className='label'>Avatar</label>
                            <input id='avatar' type="file" accept="image/*" onChange={onChange} multiple={false} title='Informe aqui o avatar do tenista' className='file-input file-input-bordered file-input-sm file-input-primary' />
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                {cropData && <img src={cropData} alt="cropped" className='border border-primary object-contain max-w-full max-h-full' width={300} height={400} onClick={openModal}/>}
                            </div>
                            <div className='w-full'>
                                <div className='grid gap-2'>
                                    <div className='form-control w-full'>
                                        <label id='label-nome' className='label'>
                                            <span className='label-text'>Nome</span>
                                        </label>
                                        <input id='nome' placeholder='Ex.: Torneio de Tênis da ABB 2020' {...register('nome', { required: true })} autoFocus title='Informe aqui o nome do tenista' required className='input input-sm input-primary' />
                                        {errors.nome &&
                                            <span className="label-text-alt alert alert-error py-1 my-1">{errors.nome.message}</span>
                                        }
                                    </div>
                                    <div className='form-control w-full'>
                                        <label id='label-email' className='label'>
                                            <span className='label-text'>Email</span>
                                        </label>
                                        <input id='email' type='email' placeholder='Ex.: nome.sobrenome@email.com' {...register('email', { required: true })} autoFocus title='Informe aqui o email do tenista' required className='input input-sm input-primary' />
                                        {errors.nome &&
                                            <span className="label-text-alt alert alert-error py-1 my-1">{errors.nome.message}</span>
                                        }
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='form-control w-full'>
                                            <label id='label-data-nascimento' className='label'>
                                                <span className='label-text'>Data de Nascimento</span>
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
                                                name="dataNascimento"
                                                control={control}
                                            />
                                            {errors.dataNascimento &&
                                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.dataNascimento.message}</span>
                                            }
                                        </div>
                                        <div className='form-control w-full'>
                                            <label className='label'>Sexo</label>
                                            <div className='flex gap-4'>
                                                <div className='form-control'>
                                                    <label id='label-sexo-masculino' className='label justify-start gap-1'>
                                                        <input id='sexo-masculino' type='radio' value={1} {...register('codigoSexo', { valueAsNumber: true })} title='Informe aqui o sexo do tenista' required className='radio radio-sm radio-primary' />
                                                        <span className='label-text'>Masculino</span>
                                                    </label>
                                                </div>
                                                <div className='form-control'>
                                                    <label id='label-sexo-feminino' className='label justify-start gap-1'>
                                                        <input id='sexo-feminino' type='radio' value={2} {...register('codigoSexo')} title='Informe aqui o sexo do tenista' required className='radio radio-sm radio-primary' />
                                                        <span className='label-text'>Feminino</span>
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.codigoSexo &&
                                                <span className="label-text-alt alert alert-error py-1 my-1">{errors.codigoSexo.message}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end gap-1'>
                            <button id='btn-reset' type='reset' onClick={onReset} className='btn btn-primary btn-outline btn-sm flex gap-1'><FaEraser />Limpar</button>
                            <button id='btn-cancel' type='button' className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Cancelar</button>
                            <button id='btn-salve' type='submit' className='btn btn-primary btn-sm flex gap-1'><FaCheck />Salvar</button>
                        </div>
                    </div>

                </form>
                <div className='flex justify-end gap-1'>
                    <Link to='/torneios' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</Link>
                </div>
            </section >
            <a id='anchor-modal-foto' href="#modal-foto" className='hidden invisible'>open modal</a>
            <div className="modal" id='modal-foto'>
                <div className="modal-box relative">
                    <div className='flex flex-col gap-2'>
                        <Cropper
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={3 / 4}
                            aspectRatio={3 / 4}
                            width={300}
                            height={400}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={400}
                            minCropBoxWidth={300}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            onInitialized={setCropper}
                            guides={true}
                        />
                        <div className='flex justify-end gap-1'>
                            <button type='button' onClick={() => { }} className='btn btn-primary btn-outline btn-sm flex gap-1'><FaTimes />Cancelar</button>
                            <a href='#' onClick={getCropData} className='btn btn-primary btn-sm flex gap-1'><FaCheck />Confirmar</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}