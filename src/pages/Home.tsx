import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../component/MonthlySummary'
import Calendar from '../component/Calendar'
import TransactionMenu from '../component/TransactionMenu'
import TransactionForm from '../component/TransactionForm'
import { Transaction } from '../types'

interface HomeProps {
  monthlyTransactions: Transaction[]
}

const Home = ({monthlyTransactions}: HomeProps) => {
  return (
    <Box sx={{display: "flex"}}>
      {/* 左側 */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}></MonthlySummary>
        <Calendar></Calendar>
      </Box>
      {/* 右側 */}
      <Box>
        <TransactionMenu></TransactionMenu>
        <TransactionForm></TransactionForm>
      </Box>
    </Box>
  )
}

export default Home