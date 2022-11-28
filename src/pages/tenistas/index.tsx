import { Suspense } from "react";
import { FaHome, FaPlusCircle, FaSearch } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Alert } from "../../components/alert";
import { Spinner } from "../../components/spinner";

export const TenistaHomePage = () => {
    const location = useLocation();
    const message = location?.state?.message;

    return (
        <div className='flex flex-col h-full gap-2'>
            <h1 className='text-primary text-3xl'>Tenista Home Page</h1>
            <div className='flex justify-center items-center'>
                <div className='btn-group'>
                    <NavLink to='/home' type='button' className='btn btn-primary btn-sm btn-outline flex gap-1'><FaHome />Home</NavLink>
                    <NavLink to='/tenistas/novo' className='btn btn-sm btn-primary btn-outline flex gap-1'><FaPlusCircle />Novo</NavLink>
                    <NavLink to='/tenistas/pesquisa' className='btn btn-sm btn-primary btn-outline flex gap-1'><FaSearch />Consulta</NavLink>
                </div>
            </div>
            {message && <Alert message={message} />}
            <div className='flex-1'>
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}