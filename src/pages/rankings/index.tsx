import { CellContext, ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { FormEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { useQuery, useQueryClient } from 'react-query';
import { Spinner } from '../../components/spinner';
import { IRanking, ITemporada } from '../../models';
import { findAll } from '../../services/RankingServices';

export const RankingHomePage = () => {
    const [filter, setFilter] = useState<IRanking>();
    const [temporada, setTemporada] = useState<ITemporada>();
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const fetchDataOptions = { pageIndex, pageSize, filter };
    const { data, isFetching, isLoading, status } = useQuery(['rankings', fetchDataOptions], () => findAll(fetchDataOptions));
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
    const queryClient = useQueryClient();

    const columns = useMemo<ColumnDef<IRanking>[]>(
        () => [
            {
                header: () => <span className='flex justify-center'>Posição</span>,
                accessorKey: 'posicao',
                cell: (props: CellContext<IRanking, any>) => {
                    return (
                        <div className="avatar placeholder flex justify-center">
                            <div className="bg-primary-focus text-primary-content rounded-full w-16 mask mask-hexagon-2">
                                <span className="text-3xl">{props.getValue()}</span>
                            </div>
                        </div>
                    );
                }
            },
            {
                id: 'tenista',
                header: () => <span className='flex justify-center'>Tenista</span>,
                columns: [
                    {
                        header: () => <span className='flex justify-center'>Avatar</span>,
                        accessorKey: 'tenista.avatarUrl',
                        cell: (props: CellContext<IRanking, any>) => {
                            return (
                                <div className='avatar flex justify-center'>
                                    <div className='w-16 my-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                                        <img src={props.getValue()} alt='Avatar do tenista' />
                                    </div>
                                </div>
                            );
                        }
                    },
                    {
                        header: () => <span className='flex justify-center'>Nome</span>,
                        accessorKey: 'tenista.nome',
                        cell: (props: CellContext<IRanking, any>) => (<span className='text-2xl flex justify-center'>{props.getValue()}</span>)
                    },
                ]
            },
            {
                header: () => <span className='flex justify-center'>Temporada</span>,
                accessorKey: 'temporada.descricao',
                cell: (props: CellContext<IRanking, any>) => (<span className='text-2xl flex justify-center'>{props.getValue()}</span>)
            },
            {
                id: 'desafios',
                header: () => <span className='flex justify-center '>Desafios</span>,
                columns: [
                    {
                        header: () => <span className='flex justify-center'>Realizados</span>,
                        accessorKey: 'totalDesafiosRealizados',
                        cell: (props: CellContext<IRanking, any>) => (<span className='text-2xl flex justify-center'>{props.getValue()}</span>)
                    },
                    {
                        header: () => <span className='flex justify-center'>Recebidos</span>,
                        accessorKey: 'totalDesafiosRecebidos',
                        cell: (props: CellContext<IRanking, any>) => (<span className='text-2xl flex justify-center'>{props.getValue()}</span>)
                    },
                    {
                        header: () => <span className='flex justify-center'>Vencidos</span>,
                        accessorKey: 'totalDesafiosVencidos',
                        cell: (props: CellContext<IRanking, any>) => (<span className='text-2xl flex justify-center'>{props.getValue()}</span>)
                    },
                    {
                        header: () => <span className='flex justify-center'>Perdidos</span>,
                        accessorKey: 'totalDesafiosPerdidos',
                        cell: (props: CellContext<IRanking, any>) => (<span className='text-2xl flex justify-center'>{props.getValue()}</span>)
                    },
                ]
            },

        ],
        []
    );

    useEffect(() => {
        const prefetchData = async () => {
            if (pageIndex > 0) { //fetch previous data
                const fetchDataOptions = { pageIndex: pageIndex - 1, pageSize: pageSize, filter };
                queryClient.prefetchQuery(['data', fetchDataOptions], () => findAll(fetchDataOptions));
            }
            if (pageIndex < table.getPageCount() - 2) { //fetch next data
                const fetchDataOptions = { pageIndex: pageIndex + 2, pageSize, filter };
                queryClient.prefetchQuery(['data', fetchDataOptions], () => findAll(fetchDataOptions));
            }
        }
        prefetchData();
    }, [pageIndex]);

    const pesquisar = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilter({ temporada } as IRanking);
        setPagination({ pageIndex: 0, pageSize })
    }, [temporada, pageSize]);

    const table = useReactTable({
        data: data?.rows ?? [],
        columns,
        pageCount: data?.pageCount ?? -1,
        state: {
            pagination
        },
        getRowId: row => String(row.id),
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true
    });

    const resetForm = () => {
        setTemporada(undefined);
    }

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Consulta de Temporadas</h1>
            <div className='overflow-x-auto'>
                <table id='table-peoples' className='table table-zebra table-compact w-full'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Fragment key={headerGroup.id}>
                                <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-b border-y'>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <th key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder ? null : (
                                                    <div>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </div>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </Fragment>
                        ))}
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr className='border-b border-gray-200 odd:bg-gray-50 hover:bg-gray-100'>
                                <td colSpan={8}>
                                    <Spinner />
                                </td>
                            </tr>
                        )}
                        {table.getRowModel().rows.map(row => {
                            return (
                                <tr key={row.id} className='hover'>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className='p-1'>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between items-center m-1 bg-base-100'>
                <span className='gap-1 hidden md:flex'>
                    <div>Página</div>
                    <strong>{table.getState().pagination.pageIndex + 1} de{' '}{table.getPageCount()} {` (de ${data?.totalElements} registros encontrados)`}</strong>
                </span>
                <div id='page-buttons' className='btn-group w-full md:w-auto justify-center'>
                    <button id='btn-first-page' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} title='Primeira Página' className='btn btn-primary btn-sm'>
                        <FaAngleDoubleLeft />
                    </button>
                    <button id='btn-previous-page' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} title='Página Anterior' className='btn btn-primary btn-sm'>
                        <FaAngleLeft />
                    </button>
                    <button id='btn-current-page' className='btn btn-primary btn-sm'>
                        Página {table.getState().pagination.pageIndex + 1}
                    </button>
                    <button id='btn-next-page' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} title='Próxima Página' className='btn btn-primary btn-sm'>
                        <FaAngleRight />
                    </button>
                    <button id='btn-last-page' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={(pageIndex + 1) >= table.getPageCount()} title='Última Página' className='btn btn-primary btn-sm'>
                        <FaAngleDoubleRight />
                    </button>
                </div>
                <div className='hidden md:flex gap-1 items-center'>

                    Ir para a página:
                    <input
                        id='goto-page-number'
                        type='number' defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        min={0}
                        max={table.getPageCount()}
                        title='Ir para a página'
                        className='input input-sm input-bordered input-primary'
                    />
                    <select id='page-size' value={table.getState().pagination.pageSize} onChange={e => { table.setPageSize(Number(e.target.value)) }} title='Mudar tamanho da página' className='select select-sm select-bordered select-primary py-1'>
                        {[1, 2, 10, 20, 50, 100].map(pageSize => (<option key={pageSize} value={pageSize} className='align-middle'>Visualizar {pageSize}</option>))}
                    </select>
                </div>
            </div>
        </section>
    );
}