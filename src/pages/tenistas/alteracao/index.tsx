import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const TenistaAlteracaoPage = () => {
    const { id } = useParams();
    return (
        <section>
            <h1 className='text-primary text-xl'>Alteração do Tenista {id}</h1>
            <div className='flex justify-end gap-1'>
                <Link to='/tenistas' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</Link>
            </div>
        </section>
    );
}