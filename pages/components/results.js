import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs};
}

const rows = [
  createData('Calories', 999, 6.0, 24, 4.0),
  createData('Белки', 237, 9.0, 37, 4.3),
  createData('Жиры', 262, 16.0, 24, 6.0),
  createData('Углеводы', 305, 3.7, 67, 4.3),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ваши результаты</TableCell>
            <TableCell align="center">Для поддержания веса</TableCell>
            <TableCell align="center">Для похудения&nbsp;(-10%)</TableCell>
            <TableCell align="center">Для набора веса&nbsp;(+10%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
