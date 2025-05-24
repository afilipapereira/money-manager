'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import HomeHeading from '@/app/components//HomeHeading';
import NewExpense from '@/app/components/transactions/NewExpense';
import TransactionsList from '@/app/components/transactions/TransactionsList';

export default function TransactionsSection({ categories, user }) {
  const [transactions, setTransactions] = useState(null);
  const [expensesAfterIncome, setExpensesAfterIncome] = useState(0);

  const fetchTransactions = async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('transactions').select().order('date', { ascending: false });
    setTransactions(data);
  };

  const fetchExpensesAfterIncome = async() => {
    const supabase = await createClient();
    const expensesAfterIncomeData = await supabase.rpc('expenses_sum_after_latest_income');
    const expensesAfterIncome = expensesAfterIncomeData?.data ?? 0;
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

  return (
    <>
      <HomeHeading user={user} expensesAfterIncome={expensesAfterIncome} />

      <NewExpense onTransactionAdded={updateTransactionsSection} categories={categories} />
      <Box sx={{ mt: 5 }}>
        {transactions ? (
          transactions.length > 0 ?
            <TransactionsList transactions={transactions} categories={categories} />
          : 
            <Typography>No transactions found.</Typography>
        ) :
          <CircularProgress size={20}/>
        }
      </Box>
    </>
  );
}
