import { BsFillCalendar3RangeFill } from "react-icons/bs";
import { FaCaretDown, FaHome, FaPlus, FaRegBell, FaRegEnvelope, FaSearch, FaUsers } from "react-icons/fa";
import { GiRank3, GiTennisCourt } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import rackets from '../../assets/icons/rackets.svg';
export const NavBar = () => {
    return (
        <div className='navbar bg-primary text-primary-content z-50'>
            <a className='btn btn-ghost normal-case text-xl'>Tênis App</a>
            <div className='navbar-start'></div>
            <div className='navbar-center'>
                <ul className='menu menu-horizontal p-0 z-50'>
                    <li><NavLink to='/home'><FaHome className='w-5 h-5' />Home</NavLink></li>
                    <li tabIndex={0}>
                        <NavLink to='/temporadas'><BsFillCalendar3RangeFill className='w-5 h-5' />Temporadas<FaCaretDown /></NavLink>
                        <ul className='p-2 bg-primary w-full z-50'>
                            <li><NavLink to='/temporadas/nova'><FaPlus />Nova</NavLink></li>
                            <li><NavLink to='/temporadas/pesquisa'><FaSearch />Pesquisa</NavLink></li>
                        </ul>
                    </li>
                    <li tabIndex={0}>
                        <NavLink to='/tenistas'><FaUsers className='w-5 h-5' />Tenistas<FaCaretDown /></NavLink>
                        <ul className='p-2 bg-primary w-full z-50'>
                            <li><NavLink to='/tenistas/novo'><FaPlus />Novo</NavLink></li>
                            <li><NavLink to='/tenistas/pesquisa'><FaSearch />Pesquisa</NavLink></li>
                        </ul>
                    </li>
                    <li tabIndex={0}>
                        <NavLink to='/desafios'>
                            <img src={rackets} className='w-5 text-white' alt='duas raquetes cruzadas' />
                            Desafios<FaCaretDown /></NavLink>
                        <ul className='p-2 bg-primary w-full z-50'>
                            <li><NavLink to='/desafios/novo'><FaPlus />Novo</NavLink></li>
                            <li><NavLink to='/desafios/pesquisa'><FaSearch />Pesquisa</NavLink></li>
                        </ul>
                    </li>
                    <li tabIndex={0}>
                        <NavLink to='/torneios'><GiTennisCourt className='w-5 h-5' />Torneios<FaCaretDown /></NavLink>
                        <ul className='p-2 bg-primary w-full'>
                            <li><NavLink to='/torneios/novo'><FaPlus />Novo</NavLink></li>
                            <li><NavLink to='/torneios/pesquisa'><FaSearch />Pesquisas</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to='/rankings'><GiRank3 className='w-5 h-5' />Rankings</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button type='button' className="btn btn-ghost btn-circle" title='Alerta'>
                    <div className="indicator">
                        <FaRegBell className='w-6 h-6' />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <FaRegEnvelope className='w-6 h-6' />
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" alt='' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary text-primary-content rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Perfil<span className="badge badge-secondary">Novo</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Sair</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
}