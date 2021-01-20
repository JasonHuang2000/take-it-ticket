import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import { useEffect } from 'react';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
		borderRadius: '10px',
	},
	root: {
		borderRadius: '10px',
	}
});

function createData(outdata) {
  const trainNum = outdata.trainNum
  const date = outdata.schedule.date
  const departure = outdata.departure
  const arrival = outdata.arrival
  const departtime = outdata.schedule.depart
  const arrivetime = outdata.schedule.arrive
  return { trainNum, date, departure, departtime, arrival, arrivetime };
}

// const rows = [{trainNum: 1, date: {year: 2020, month: 12, day: 12}, departure: "a", arrival: "b", departtime: 1010, arrivetime: 1110}];
const rows = []

export default function Shift(props) {
  const classes = useStyles();
  const { shiftData, departure, dest } = props;
	
  useEffect(() => {
    // console.log(shiftData)
		if (shiftData !== undefined && shiftData.shift !== null) {
      let i;
      for (i = 0; i < (shiftData.shift.length < 5 ? shiftData.shift.length : 5); i++) {
        rows.push(createData(shiftData.shift[i]))
      }
    }
	})

  return (
    <Paper>
      <Container>
        <Typography variant="h4">
          from {departure} to {dest}
        </Typography>
      </Container>
    </Paper>
    // <TableContainer component={Paper} className={classes.root}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         from {departure} to {dest}
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>Train Number</TableCell>
    //         <TableCell align="right">Date</TableCell>
    //         {/* <TableCell align="right">Departure Station</TableCell> */}
    //         <TableCell align="right">Departure Time</TableCell>
    //         {/* <TableCell align="right">Arrival Station</TableCell> */}
    //         <TableCell align="right">Arrival Time</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {/* <TableRow>
    //         from {departure} to {dest}
    //       </TableRow> */}
    //       {rows.map((row) => (
    //         <TableRow key={row.trainNum}>
    //           <TableCell component="th" scope="row">
    //             {row.trainNum}
    //           </TableCell>
    //           <TableCell align="right">{`${row.date.year} / ${row.date.month} / ${row.date.day}`}</TableCell>
    //           {/* <TableCell align="right">{row.departure}</TableCell> */}
    //           <TableCell align="right">{`${row.departtime.hour}:${row.departtime.minute}`}</TableCell>
    //           {/* <TableCell align="right">{row.arrival}</TableCell> */}
    //           <TableCell align="right">{`${row.arrivetime.hour}:${row.arrivetime.minute}`}</TableCell>
    //           <TableCell>
                
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}