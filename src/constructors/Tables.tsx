import React, { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import '../styles/constructors/Tables.css';
import List from "../svgs/List";
import Pay from '../svgs/Pay';
import Update from '../svgs/Update';
import Delete from '../svgs/Delete';
import Search from '../svgs/Search';
import Utils from '../functions/Utils';
import ExpandList from '../svgs/ExpandList';

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
    name: string,
    can: {
        leer?: boolean,
        actualizar?: boolean,
        borrar?: boolean,
        pagar?: boolean
    },
    helper:Function,
    cantidad:{
        de: number,
        hasta: number
    }
}

const Tables = ({ url, name, can, helper, cantidad }: Params) => {
    const { leer = true, actualizar = true, borrar = true, pagar = false } = can;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<ApiData[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [filterText, setFilterText] = useState('');
    const [hasError, setHasError] = useState(false); // Estado para manejar errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Error en la petición");
                const data = await response.json();

                const displayColumns = data.products.length > 0 ? Object.keys(data.products[0]).slice(cantidad.de, cantidad.hasta) : [];
                setColumns(displayColumns);

                const formattedRows = data.products.map((item: ApiData, index: number) => ({
                    id: index + 1,
                    ...item,
                }));
                setRows(formattedRows);
                setOrderBy(displayColumns[0] || '');
                setHasError(false);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setHasError(true);
            }
        };
        fetchData();
    }, [url]);

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

    const filteredRows = rows.filter((row) =>
        columns.some((column) =>
            row[column]?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const visibleRows = React.useMemo(
        () =>
            [...filteredRows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredRows]
    );

    return (
        <Box sx={{ width: '100%', backgroundColor:"#F4F4F4", paddingX:"40px", pb:1,
            "@media (max-width: 600px)": {
            paddingX:"10px"
        },
         }}>
            <h1 className='dashTitle'>{name}</h1>

            {hasError ? (
                <div className='loaderContent'><div className='loader'></div></div>
            ) : (
                <>
                    <span className='dashBusqueda'>
                        <TextField
                            label={"Buscar " + name}
                            variant="outlined"
                            value={filterText}
                            onChange={(e) => {setFilterText(e.target.value); setPage(0)}}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    "& fieldset": {
                                        borderColor: "#47474799",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#222",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#8FBCFF",
                                    },
                                    "& .MuiInputLabel-root": {
                                        height:"40px"
                                    }
                                },
                                backgroundColor: "#fff",
                                height:"40px"
                            }}
                        />
                        <Button sx={{ backgroundColor: "#7B6FCC", color: "#fff", textTransform: 'none' }} onClick={()=>helper("Add")}>Agregar</Button>
                    </span>

                    <TableContainer sx={{  mb: 3 }}>
                        <Table sx={{ borderCollapse: 'separate', borderSpacing: '4px 4px' }} aria-labelledby="tableTitle" size="medium">
                            <TableHead>
                                {visibleRows.length > 0 ? 
                                <TableRow className='dashConstructorRowTableHeader dashConstructorRowTable'>
                                    {leer && <TableCell sx={{width:"40px"}} className='infoIcon'><ExpandList/></TableCell>}
                                    {columns[0] && <TableCell sx={{ border: 'none' }} style={{ textAlign: 'left', verticalAlign: 'middle' }}
                                    sortDirection={orderBy === columns[0] ? order : false}
                                    onClick={() => handleRequestSort(columns[0])} className=''
                                    >
                                        <TableSortLabel
                                                active={orderBy === columns[0]}
                                                direction={orderBy === columns[0] ? order : 'asc'}
                                            >
                                                {Utils.getDefinition(columns[0]?.charAt(0).toUpperCase() + columns[0]?.slice(1))}
                                                {orderBy === columns[0] ? (
                                                    <Box component="span" sx={visuallyHidden}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        
                                    </TableCell>}
                                    {columns.slice(1).map((column) => (
                                        <TableCell
                                            sx={{ border: 'none' }}
                                            style={{ textAlign: 'left', verticalAlign: 'middle' }}
                                            key={column}
                                            className="hide-on-mobile"
                                            sortDirection={orderBy === column ? order : false}
                                            onClick={() => handleRequestSort(column)}
                                        >
                                            <TableSortLabel
                                                active={orderBy === column}
                                                direction={orderBy === column ? order : 'asc'}
                                            >
                                                {Utils.getDefinition(column.charAt(0).toUpperCase() + column.slice(1))}
                                                {orderBy === column ? (
                                                    <Box component="span" sx={visuallyHidden}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    <TableCell sx={{ border: 'none' }} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        Acciones
                                    </TableCell>
                                </TableRow>: <></>}
                                
                            </TableHead>
                            <TableBody>
                                {visibleRows.length > 0 ? (
                                    visibleRows.map((row) => (
                                        <TableRow key={row.id} className='dashConstructorRowTable' sx={{ borderCollapse: 'collapse' }}>
                                            {leer && <TableCell>
                                            <button onClick={() => helper("View",row)} className='tableIcon dashList'><List /></button>
                                            </TableCell>}
                                            <TableCell sx={{ border: 'none', paddingY: 0 }} style={{ textAlign: 'left', verticalAlign: 'middle' }} className='cell-separator'>
                                                {row[columns[0]]}
                                            </TableCell>
                                            {columns.slice(1).map((column) => (
                                                <TableCell
                                                    sx={{ border: 'none', paddingY: 0 }}
                                                    style={{ textAlign: 'left', verticalAlign: 'middle' }}
                                                    key={column}
                                                    className="hide-on-mobile cell-separator"
                                                >
                                                    {row[column]}
                                                </TableCell>
                                            ))}
                                            <TableCell sx={{ border: 'none', paddingY: 1.5 }} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {pagar && <button onClick={() => helper("Pay",row)} className='tableIcon dashPay'><Pay /></button>}
                                                {actualizar && <button onClick={() => helper("Update",row)} className='tableIcon dashUpdate'><Update /></button>}
                                                {borrar && <button onClick={() => helper("Delete",row)} className='tableIcon dashDelete'><Delete /></button>}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} sx={{ textAlign: 'center', color: '#888', border:"none" }}>
                                            <div className='loaderContent'><div className='loader'></div></div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {visibleRows.length > 0 ? 
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Numero de filas" 
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`} // Cambia "of"
                        />
                        : <></>    
                    }
                    
                </>
            )}
        </Box>
    );
};

export default Tables;
