'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  Box,
  CircularProgress,
  Typography,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HomeHeading from './HomeHeading';
import NewExpenseForm from './NewExpenseForm';
import TransactionsList from './TransactionsList';

export default function TransactionsSection({ categories, user }) {
  const [transactions, setTransactions] = useState(null);
  const [expensesAfterIncome, setExpensesAfterIncome] = useState(0);
  const [transactionIsOpen, setTransactionIsOpen] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState(null);

  //List transactions
  const fetchTransactions = async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('transactions').select().order('date', { ascending: false });
    setTransactions(data);
  };

  const fetchExpensesAfterIncome = async() => {
    const supabase = await createClient();
    const expensesAfterIncomeData = await supabase.rpc('expenses_sum_after_latest_income');
    const expensesAfterIncome = expensesAfterIncomeData?.data ?? '0.00€';
    const expensesAfterIncomeFormatted = new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
    }).format(expensesAfterIncome);
    setExpensesAfterIncome(expensesAfterIncomeFormatted);
  }

  const updateTransactionsSection = () => {
    fetchTransactions();
    fetchExpensesAfterIncome();
  };

  useEffect(() => {
    updateTransactionsSection();
  }, []);

  //Edit transaction
  const fetchTransaction = async (transactionId) => {
    const supabase = await createClient();
    const { data } = await supabase.from('transactions').select().eq('id', transactionId);
    setTransactionSelected(data[0]);
    setTransactionIsOpen(true);
  };

  const handleCloseTransactionDetail = () => {
    setTransactionIsOpen(false);
    setTransactionSelected(null);
  };

  const handleOpenTransactionDetail = (e, transactionId = null) => {
    if(transactionId !== null)
      fetchTransaction(transactionId);
    else
      setTransactionIsOpen(true);
  };

  const handleSubmitSuccess = () => {
    updateTransactionsSection();
    handleCloseTransactionDetail();
  };

  return (
    <>
      <HomeHeading user={user} expensesAfterIncome={expensesAfterIncome} />

      {!transactionIsOpen && (
        <Fab color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: '15px',
            right: '15px',
          }}
        >
          <AddIcon onClick={e => handleOpenTransactionDetail(e)} />
        </Fab>
      )}

      {transactionIsOpen && <NewExpenseForm transaction={transactionSelected} categories={categories} handleCloseTransactionDetail={handleCloseTransactionDetail} handleSubmitSuccess={handleSubmitSuccess}  />}

      <Box sx={{ mt: 5 }}>
        {transactions ? (
          transactions.length > 0 ?
            <TransactionsList transactions={transactions} categories={categories} handleOpenTransactionDetail={handleOpenTransactionDetail}/>
          : 
            <Typography>No transactions found.</Typography>
        ) :
          <CircularProgress size={20}/>
        }
      </Box>
    </>
  );
}
