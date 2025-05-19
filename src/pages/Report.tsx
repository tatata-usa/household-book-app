import React from 'react'
import { Grid, Paper } from "@mui/material";
import MonthSelector from '../component/MonthSelector';
import CategoryChart from '../component/CategoryChart';
import BarChart from '../component/BarChart';
import TransactionTable from '../component/TransactionTable';
import { Transaction } from '../types';

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const Report = ({ currentMonth, setCurrentMonth, monthlyTransactions, isLoading }: ReportProps) => {
  const commonPaperStyle = {
    height: "400px",
    display: 'flex',
    flexDirection: 'column',
    p: 2
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}></MonthSelector>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}><CategoryChart monthlyTransactions={monthlyTransactions} isLoading={isLoading}></CategoryChart></Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={commonPaperStyle}><BarChart monthlyTransactions={monthlyTransactions} isLoading={isLoading}></BarChart></Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <TransactionTable></TransactionTable>
      </Grid>
    </Grid>
  )
}

export default Report