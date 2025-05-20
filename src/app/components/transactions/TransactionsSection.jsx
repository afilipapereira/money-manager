'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import {
  Box,
} from '@mui/material';

import NewExpense from '@/app/components/transactions/NewExpense';
import TransactionsList from '@/app/components/transactions/TransactionsList';

export default function TransactionsSection({ categories }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const { data } = await supabase.from('transactions').select().order('date', { ascending: false });
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <NewExpense onTransactionAdded={fetchTransactions} categories={categories} />

      {transactions.length > 0 ?
        <TransactionsList transactions={transactions} categories={categories} />
      : 
        <Box sx={{width: '30px', marginTop: '2.5em'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#A0A0A0" stroke="#A0A0A0" strokeWidth="5" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#A0A0A0" stroke="#A0A0A0" strokeWidth="5" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#A0A0A0" stroke="#A0A0A0" strokeWidth="5" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </Box>
      }
    </>
  );
}
