import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../component/MonthlySummary'
import Calendar from '../component/Calendar'
import TransactionMenu from '../component/TransactionMenu'
import TransactionForm from '../component/TransactionForm'

const Home = () => {
  return (
    <Box sx={{display: "flex"}}>
      {/* 左側 */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary></MonthlySummary>
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