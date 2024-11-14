import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import '../styles/constructors/Tables.css'
import List from "../svgs/List";
import Pay from '../svgs/Pay';
import Update from '../svgs/Update';
import Delete from '../svgs/Delete';

interface ApiData {
    [key: string]: any;
}

type Order = 'asc' | 'desc';

function descendingComparator(a: any, b: any, orderBy: string) {
    if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
        return b[orderBy] - a[orderBy];
    } else {
        return b[orderBy].toString().localeCompare(a[orderBy].toString());
    }
}

function getComparator(
    order: Order,
    orderBy: string,
): (a: ApiData, b: ApiData) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface Params {
    url: string,
    can: {
        leer?: boolean,
        actualizar?: boolean,
        borrar?: boolean,
        pagar?: boolean
    }
}

const Tables = ({ url, can }: Params) => {
    const { leer = true, actualizar = true, borrar = true, pagar = false } = can;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<ApiData[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();

            const displayColumns = data.users.length > 0 ? Object.keys(data.users[0]).slice(2, 5) : [];
            setColumns(displayColumns);

            const formattedRows = data.users.map((item: ApiData, index: number) => ({
                id: index + 1,
                ...item,
            }));
            setRows(formattedRows);
            setOrderBy(displayColumns[0] || '');
        };
        fetchData();
    }, []);

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        event;
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePrintRowData = (row: ApiData) => {
        console.log(row);
    };

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows]
    );

    return (
        <Box sx={{ width: '100%' }} >
            <TableContainer sx={{ padding: "5px" }}>
                <Table sx={{ minWidth: 750, borderCollapse: 'separate', borderSpacing: '0px 10px' }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow className='dashConstructorRowTableHeader'>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{ border: 'none' }}
                                    style={{ textAlign: 'center', verticalAlign: 'middle' }}
                                    key={column}
                                    sortDirection={orderBy === column ? order : false}
                                    onClick={() => handleRequestSort(column)}
                                >
                                    <TableSortLabel
                                        active={orderBy === column}
                                        direction={orderBy === column ? order : 'asc'}
                                    >
                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                        {orderBy === column ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell sx={{ border: 'none'}} style={{ textAlign: 'center', verticalAlign: 'middle' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row) => (
                            <TableRow key={row.id} className='dashConstructorRowTable' sx={{ borderCollapse: 'collapse' }}>
                                {columns.map((column) => (
                                    <TableCell sx={{ border: 'none' }} style={{ textAlign: 'center', verticalAlign: 'middle' }} key={column}>{row[column]}</TableCell>
                                ))}
                                <TableCell sx={{ border: 'none' }} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {pagar &&
                                        <button onClick={() => handlePrintRowData(row)} className='tableIcon dashPay'>
                                            <Pay></Pay>    
                                        </button>}
                                    {leer &&
                                        <button onClick={() => handlePrintRowData(row)} className='tableIcon dashList'>
                                            <List></List>
                                        </button>}
                                    {actualizar &&
                                        <button onClick={() => handlePrintRowData(row)} className='tableIcon dashUpdate'>
                                            <Update></Update>
                                        </button>}
                                    {borrar &&
                                        <button onClick={() => handlePrintRowData(row)} className='tableIcon dashDelete'>
                                        <Delete></Delete>
                                    </button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Numero de filas"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </Box>
    );
};

export default Tables;
