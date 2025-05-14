import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../component/MonthlySummary'
import Calendar from '../component/Calendar'
import TransactionMenu from '../component/TransactionMenu'
import TransactionForm from '../component/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  onSaveTransaction: (transaction: Schema) => Promise<void>
  onDeleteTransaction: (transactionId: string) => Promise<void>
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>
}

const Home = ({monthlyTransactions, setCurrentMonth, onSaveTransaction, onDeleteTransaction, onUpdateTransaction}: HomeProps) => {

  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay
  })

  // フォームの開閉処理(バツボタンを押下したとき)
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
    setSelectedTransaction(null);
  }

  // フォームの開閉処理(内訳追加ボタンを押下したとき)
  const handleAddTransactionForm = () => {
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen)
    }
  }

  // 取引が選択された時の処置
  const handleSelectTransaction = (transaction: Transaction) => {
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
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
        <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} onAddTransactionForm={handleAddTransactionForm} onSelectTransaction={handleSelectTransaction}></TransactionMenu>
        <TransactionForm onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay} onSaveTransaction={onSaveTransaction} selectedTransaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} onDeleteTransaction={onDeleteTransaction} onUpdateTransaction={onUpdateTransaction}></TransactionForm>
      </Box>
    </Box>
  )
}

export default Home