import React from 'react'
import { Grid, Paper } from "@mui/material";
import MonthSelector from '../component/MonthSelector';
import CategoryChart from '../component/CategoryChart';
import BarChart from '../component/BarChart';
import TransactionTable from '../component/TransactionTable';

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Report = ({ currentMonth, setCurrentMonth }: ReportProps) => {
  const commonPaperStyle = {
    height: {xs: "auto", md: "400px"},
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}></MonthSelector>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}><CategoryChart></CategoryChart></Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}><BarChart></BarChart></Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <TransactionTable></TransactionTable>
      </Grid>
    </Grid>
  )
}

export default Report