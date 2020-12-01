import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

export default function DenseTable({
  rows = [],
  maintainingWeigthCalories,
  proCal,
  fatCal,
  carbCal
}) {
  const classes = useStyles();
  console.log(rows);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
          style={{backgroundColor: "#FDF5F8"}}
        >
          <TableHead>
            <TableRow>
              <TableCell>Your results</TableCell>
              <TableCell align="center">To maintain weigth</TableCell>
              <TableCell align="center">To loose weigth&nbsp;(not obese; deficit 10%)</TableCell>
              <TableCell align="center">To loose weigth&nbsp;(1, 2 or 3 stage f obesity; deficit 15%)</TableCell>
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
    </>
  );
}
