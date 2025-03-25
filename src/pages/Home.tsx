import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../component/MonthlySummary'
import Calendar from '../component/Calendar'
import TransactionMenu from '../component/TransactionMenu'
import TransactionForm from '../component/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {

  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false)

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay
  })

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }

  // フォームの開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }

  return (
    <Box sx={{display: "flex"}}>
      {/* 左側 */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}></MonthlySummary>
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} setCurrentDay={setCurrentDay} currentDay={currentDay} today={today}></Calendar>
      </Box>
      {/* 右側 */}
      <Box>
        <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} onAddTransactionForm={handleAddTransactionForm}></TransactionMenu>
        <TransactionForm onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay}></TransactionForm>
      </Box>
    </Box>
  )
}

export default Home