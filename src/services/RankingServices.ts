import { IRanking } from "../models";

export async function findAll(options: { pageIndex: number, pageSize: number, filter: IRanking | undefined }) {
    // 
    const newRows: any = [];
    return {
        rows: newRows.slice(
            options.pageIndex * options.pageSize,
            (options.pageIndex + 1) * options.pageSize
        ),
        pageCount: Math.ceil(newRows.length / options.pageSize),
        totalElements: newRows.length
    }
}