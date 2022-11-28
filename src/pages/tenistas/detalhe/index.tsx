import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { IdParam } from "../../../models";
import { obterTenistaPeloId } from '../../../services/TenistaServices';
import { dateFormat } from "../../../utils";

export const TenistaDetalhePage = () => {
    const { id } = useParams<IdParam>();
    const { data } = useQuery(['tenista', id], () => obterTenistaPeloId(id as string));

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Dados do Tenista {id}</h1>
            <div className='card card-compact card-bordered border-primary'>
                <div className='card-body'>
                    <div className='flex gap-2'>
                        <img src={data?.avatarUrl} alt='Avatar do Tenista' crossOrigin="" width={300} height={400}/>
                        <div className='w-full'>
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
                                    <output id='data-nascimento' className='input input-disabled input-sm input-bordered'>{data?.sexo}</output>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex justify-end gap-1'>
                <Link to='/tenistas' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</Link>
            </div>
        </section>
    );
}