import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, Toolbar, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface ApiData {
  [key: string]: any;
}

interface Params {
    url:string;
    read:boolean;
    update:boolean;
    delete:boolean;
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
    url:string;
    canRead:boolean;
    canUpdate:boolean;
    canDelete:boolean;
}

function Tables({url, canRead, canUpdate, canDelete}:Params){
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<ApiData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/users');
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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
            API Data Table
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column}>{row[column]}</TableCell>
                  ))}
                  <TableCell>
                    <Button variant="contained" onClick={() => handlePrintRowData(row)}>
                      Print Row Data
                    </Button>
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
        />
      </Paper>
    </Box>
  );
};

export default Tables;
