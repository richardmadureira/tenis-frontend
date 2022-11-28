import { FaArrowLeft } from "react-icons/fa";

export const TorneioConsultaPage = () => {
    return (
        <section>
            <h1 className='text-primary text-xl'>Consulta de Torneios</h1>
            <div className='flex justify-end gap-1'>
                <button type='button' className='btn btn-primary btn-sm outline flex gap-1'><FaArrowLeft />Voltar</button>
            </div>
        </section>
    );
}