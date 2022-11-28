import { AiOutlineTrophy } from "react-icons/ai";
import { BsCalendar3Range } from 'react-icons/bs';
import { FaUsers } from "react-icons/fa";
import { GiPodiumWinner, GiRank2 } from 'react-icons/gi';
import { NavLink, Outlet } from "react-router-dom";

export const HomePage = () => {
    return (
        <div className='flex flex-col h-full gap-2'>
            <h1 className='text-primary text-3xl'>Torneio de Tênis</h1>
            <div className='flex justify-center items-center'>
                <div className='btn-group'>
                    <NavLink to='/temporadas' className='btn btn-sm btn-primary btn-outline flex gap-1'><BsCalendar3Range />Temporadas</NavLink>
                    <NavLink to='/desafios' className='btn btn-sm btn-primary btn-outline flex gap-1'><GiPodiumWinner />Desafios</NavLink>
                    <NavLink to='/torneios' className='btn btn-sm btn-primary btn-outline flex gap-1'><AiOutlineTrophy />Torneios</NavLink>
                    <NavLink to='/tenistas' className='btn btn-sm btn-primary btn-outline flex gap-1'><FaUsers />Tenistas</NavLink>
                    <NavLink to='/rankings' className='btn btn-sm btn-primary btn-outline flex gap-1'><GiRank2 />Rankings</NavLink>
                </div>
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}