import { CellContext, ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { FormEvent, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaArrowLeft, FaCheck, FaCheckDouble, FaEdit, FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { IndeterminateCheckbox } from "../../../components/indeterminate-checkbox";
import { Spinner } from "../../../components/spinner";
import { IDesafio } from "../../../models";
import { TipoPartida } from "../../../models/enums";
import { findAll } from '../../../services/DesafioServices';
import { dateFormat, tipoPartidaFormat } from "../../../utils";

export const DesafioConsultaPage = () => {
    const [filter, setFilter] = useState<IDesafio>();
    const [codigoTipoPartida, setCodigoTipoPartida] = useState<number|null>();
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const fetchDataOptions = { pageIndex, pageSize, filter };
    const { data, isFetching, isLoading, status } = useQuery(['desafios', fetchDataOptions], () => findAll(fetchDataOptions));
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
    const queryClient = useQueryClient();
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns = useMemo<ColumnDef<IDesafio>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => <IndeterminateCheckbox checked={table.getIsAllRowsSelected()} indeterminate={table.getIsSomeRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} className='checkbox-primary' />,
                cell: ({ row }) => <IndeterminateCheckbox checked={row.getIsSelected()} indeterminate={row.getIsSomeSelected()} onChange={row.getToggleSelectedHandler()} className='checkbox-primary' />,
            },
            { header: 'ID', accessorKey: 'id' },
            { 
                id: 'tipoPartida',
                header: 'Tipo de Partida',
                accessorKey: 'tipoPartida', 
                cell: (props: CellContext<IDesafio, any>) => {
                    return props.getValue() ? (<div>{props.getValue()}</div>) : <></>
                }
            },
            { header: 'Desafiante', accessorKey: 'tenistaDesafiante1.nome' },
            { header: 'Desafiado', accessorKey: 'tenistaDesafiado1.nome' },
            {
                header: 'Horário Previsto',
                accessorKey: 'horarioPrevisto',
                cell: (props: CellContext<IDesafio, any>) => {
                    return props.getValue() ? (<div>{dateFormat(props.getValue())}</div>) : <></>
                }
            },
            {
                header: 'Ações', cell: (a) => {
                    const linkDetail = '/desafios/detalhe/:id'.replace(':id', String(a.row.original.id))
                    const linkEdit = '/desafios/alteracao/:id'.replace(':id', String(a.row.original.id))
                    const linkDelete = '/desafios/exclusao/:id'.replace(':id', String(a.row.original.id))
                    return (
                        <div className='flex gap-1 justify-center w-min'>
                            <Link to={linkDetail}>
                                <button id='btn-detail' type='button' title='Detalhar' className='btn btn-primary btn-sm btn-circle'><FaEye /></button>
                            </Link>
                            <Link to={linkEdit}>
                                <button id='btn-edit' type='button' title='Editar' className='btn btn-warning btn-sm btn-circle'><FaPencilAlt /></button>
                            </Link>
                            <Link to={linkDelete}>
                                <button id='btn-delete' type='button' title='Excluir' className='btn btn-error btn-sm btn-circle'><FaTrashAlt /></button>
                            </Link>
                        </div>
                    );
                }
            }
        ],
        []
    );

    useEffect(() => {
        const prefetchData = async () => {
            if (pageIndex > 0) { //fetch previous data
                console.log('prefetch previous page');
                const fetchDataOptions = { pageIndex: pageIndex - 1, pageSize: pageSize, filter };
                queryClient.prefetchQuery(['data', fetchDataOptions], () => findAll(fetchDataOptions));
            }
            if (pageIndex < table.getPageCount() - 2) { //fetch next data
                console.log('prefetch next page');
                const fetchDataOptions = { pageIndex: pageIndex + 2, pageSize, filter };
                queryClient.prefetchQuery(['data', fetchDataOptions], () => findAll(fetchDataOptions));
            }
            table.getToggleAllPageRowsSelectedHandler();
        }
        prefetchData();
    }, [pageIndex]);

    const pesquisar = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilter({ codigoTipoPartida } as unknown as IDesafio);
        setPagination({ pageIndex: 0, pageSize })
    }, [codigoTipoPartida, pageSize]);

    const table = useReactTable({
        data: data?.content ?? [],
        columns,
        pageCount: data?.pageCount ?? -1,
        state: {
            pagination,
            rowSelection
        },
        getRowId: row => String(row.id),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true
    });

    const confirmarSelecionados = () => {
        alert('Ids de tabelas do inss selecionadas ' + Object.keys(rowSelection).map(item => parseInt(item)));
    }

    const resetForm = () => {
        setCodigoTipoPartida(null);
        setRowSelection({});
    }

    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-primary text-xl'>Consulta de Desafios</h1>
            <div className='overflow-x-auto'>
                <table id='table-peoples' className='table table-zebra table-compact w-full'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Fragment key={headerGroup.id}>
                                <tr className='hover'>
                                    <th colSpan={7}>
                                        <div className='flex gap-1 justify-end'>
                                            {status + ' - ' + isLoading} - {isFetching ? <FaCheck className='text-yellow-500' title='Atualizando dados da tabela' /> : <FaCheckDouble className='text-green-500' />}
                                        </div>
                                    </th>
                                </tr>
                                <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
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
                                <td colSpan={7}>
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
            <div className="flex gap-1 justify-end m-1">
                <Link to='/desafios' className='btn btn-primary btn-sm btn-outline flex gap-1'><FaArrowLeft />Voltar</Link>
                <button id='btn-confirmar-selecionados' type='button' onClick={confirmarSelecionados} className='btn btn-primary btn-sm gap-1'>
                    <FaCheck />
                    <span>Confirmar Selecionados</span>
                </button>
            </div>
        </section>
    );
}