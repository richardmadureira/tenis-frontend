import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const DesafioAlteracaoPage = () => {
    const { id } = useParams();
    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Alteração da Desafio {id}</h1>
            <div className='flex justify-end gap-1'>
                <Link to='/temporadas/pesquisa' className='btn btn-primary btn-sm flex gap-1'><FaArrowLeft />Voltar</Link>
            </div>
        </section>
    );
}