import React,{useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Card, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@material-ui/core';
import "../App.css";
import { CovidDataContext } from '../context/CovidDataContext';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor:"rgb(165 0 0)",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
    }))(TableRow);


    const useStyles = makeStyles({
    table: {
        minWidth: 700,
        position:'relative',
        zIndex:0
    },
    });

    const flagStyle=(flagurl)=>{
        return {
            backgroundImage:`url(${flagurl})`,
            backgroundPosition:'center',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
        }
    }

    const CovidTable=()=> {
    const {tableData,animateNumber}=useContext(CovidDataContext);
    const classes = useStyles();

    return (
        <Card id="table" className="table-container">
            <Typography className="table-title">Covid Table Countries Detail</Typography>    
                <TableContainer component={Paper} style={{ maxHeight: "450px" }}>
                <Table className={classes.table} stickyHeader  aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Country</StyledTableCell>
                    <StyledTableCell align="right">Flag</StyledTableCell>
                    <StyledTableCell align="right">Current Cases</StyledTableCell>
                    <StyledTableCell align="right">Current Recoveries</StyledTableCell>
                    <StyledTableCell align="right">Current Deaths</StyledTableCell>
                    <StyledTableCell align="right">Total Cases</StyledTableCell>
                    <StyledTableCell align="right">Total Recoveries</StyledTableCell>
                    <StyledTableCell align="right">Total Deaths</StyledTableCell>
                    <StyledTableCell align="right">Total Critical</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tableData.map(({country,
                        todayCases,
                        todayRecovered,
                        todayDeaths,
                        cases,recovered,
                        deaths,critical,
                        countryInfo},id)=>
                    (<StyledTableRow key={id}>
                        <StyledTableCell component="th" scope="row">{country}</StyledTableCell>
                        <StyledTableCell style={flagStyle(countryInfo.flag)} align="right"></StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(todayCases)}</StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(todayRecovered)}</StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(todayDeaths)}</StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(cases)}</StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(recovered)}</StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(deaths)}</StyledTableCell>
                        <StyledTableCell align="right">{animateNumber(critical)}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Card>
    );
}

export default React.memo(CovidTable);