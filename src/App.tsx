import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './component/AppLayout';
import { theme } from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { Transaction } from './types/index';
import { collection, getDocs, addDoc, deleteDoc,updateDoc, doc } from "firebase/firestore";
import {db} from "./firebase"
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  // firebaseのエラーかどうか判定する型ガード
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // firebaseから全てのデータを取得
    const fetchTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));

        const transactionsData =querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        })
        setTransactions(transactionsData);
      } catch(err) {
        if(isFireStoreError(err)) {
          console.error("firebaseのエラーは: ", err)
          console.error(err.message)
          console.error(err.code)
        } else {
          console.error("一般的なエラーは: ", err)
        }
       } finally {
        setIsLoading(false);
       }
    }
    fetchTransactions();
  }, [])

  // ひと月のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction
      } as Transaction
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction
      ])
    } catch(err) {
      if(isFireStoreError(err)) {
        console.error("firebaseのエラーは: ", err)
        console.error(err.message)
        console.error(err.code)
      } else {
        console.error("一般的なエラーは: ", err)
      }
    }
  }

  // 取引を削除する処理
  const handleDeleteTransaction = async (transactionId: string) => {
    // firestoreのデータ削除
    try {
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filteredTransactions = transactions.filter((transaction) => transaction.id !== transactionId)
      setTransactions(filteredTransactions);
    } catch(err) {
      if(isFireStoreError(err)) {
        console.error("firebaseのエラーは: ", err)
        console.error(err.message)
        console.error(err.code)
      } else {
        console.error("一般的なエラーは: ", err)
      }
    }
  }

  // 取引を更新する処理
  const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
    // firestoreのデータ更新
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef , transaction);
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? {...t, ...transaction} : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch(err) {
      if(isFireStoreError(err)) {
        console.error("firebaseのエラーは: ", err)
        console.error(err.message)
        console.error(err.code)
      } else {
        console.error("一般的なエラーは: ", err)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} onSaveTransaction={handleSaveTransaction} onDeleteTransaction={handleDeleteTransaction} onUpdateTransaction={handleUpdateTransaction}/>}></Route>
            <Route path='/report' element={<Report currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} monthlyTransactions={monthlyTransactions} isLoading={isLoading}/>}></Route>
            <Route path='/*' element={<NoMatch />}></Route>
            </Route>
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
