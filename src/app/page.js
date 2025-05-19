import HomeHeading from './components/HomeHeading';
import NewExpense from './components/NewExpense';
import TransactionsList from '@/app/components/TransactionsList';

import { supabase } from '@/utils/supabase/client';

export default async function Home() {
  const { data: transactions } = await supabase.from('transactions').select().order('date', { ascending: false });
  const { data: categories } = await supabase.from('categories').select();

  const expensesAfterIncomeData = await supabase.from('expenses_sum_after_latest_income').select().single();
  const expensesAfterIncome = expensesAfterIncomeData?.data?.expenses_sum_after_latest_income ?? 0;
  const expensesAfterIncomeFormatted = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
  }).format(expensesAfterIncome);

  const transactionsGroupedByMonth = transactions.reduce((acc, expense) => {
    const dateObj = new Date(expense.date);
    const monthYear = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(expense);

    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <HomeHeading expensesAfterIncome={expensesAfterIncomeFormatted} />
      <NewExpense categories={categories} />

      {transactions && <TransactionsList transactionsGroupedByMonth={transactionsGroupedByMonth} categories={categories} />}
    </div>
  );
}
