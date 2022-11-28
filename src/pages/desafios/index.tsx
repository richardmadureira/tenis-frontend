import { Suspense } from "react";
import { FaArrowLeft, FaPlusCircle, FaSearch } from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Alert } from "../../components/alert";
import { Spinner } from "../../components/spinner";

export const DesafioHomePage = () => {
    const location = useLocation();
    const message = location?.state?.message;

    return (
        <div className='flex flex-col h-full gap-2'>
            <h1 className='text-primary text-3xl'>Desafio Home Page</h1>
            <div className='flex justify-center items-center'>
                <div className='btn-group'>
                    <NavLink to='/desafios/novo' className='btn btn-sm btn-primary btn-outline flex gap-1'><FaPlusCircle />Novo</NavLink>
                    <NavLink to='/desafios/pesquisa' className='btn btn-sm btn-primary btn-outline flex gap-1'><FaSearch />Consulta</NavLink>
                </div>
            </div>
            {message && <Alert message={message} />}
            <div className='flex-1'>
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </div>
            <div className='flex justify-end gap-1'>
                <Link to='/home' type='button' className='btn btn-primary btn-sm'><FaArrowLeft />Voltar</Link>
            </div>
        </div>
    );
}