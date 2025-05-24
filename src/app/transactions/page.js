import HomeHeading from '../components/HomeHeading';
import TransactionsSection from '../components/transactions/TransactionsSection';

import { supabase } from '@/utils/supabase/client';

export default async function Transactions() {
  const { data: categories } = await supabase.from('categories').select();

  const expensesAfterIncomeData = await supabase.from('expenses_sum_after_latest_income').select().single();
  const expensesAfterIncome = expensesAfterIncomeData?.data?.expenses_sum_after_latest_income ?? 0;
  const expensesAfterIncomeFormatted = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
  }).format(expensesAfterIncome);

  return (
    <div style={{ padding: '20px' }}>
      <HomeHeading expensesAfterIncome={expensesAfterIncomeFormatted} />
      <TransactionsSection categories={categories} />
    </div>
  );
}
