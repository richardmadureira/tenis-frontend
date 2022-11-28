import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const TorneioDetalhePage = () => {
    const { id } = useParams();
    return (
        <section>
            <h1 className='text-primary text-xl'>Dados do Torneio {id}</h1>
            <div className='flex justify-end gap-1'>
                <button type='button' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</button>
            </div>
        </section>
    );
}