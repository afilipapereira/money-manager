import HomeHeading from './components/HomeHeading';
import NewExpense from './components/NewExpense';
import ExpensesList from '@/app/components/ExpensesList';

import { supabase } from '@/utils/supabase/client';

export default async function Home() {
  const { data: expenses } = await supabase.from('expenses').select().order('date', { ascending: false });
  const { data: categories } = await supabase.from('categories').select();

  const expensesGroupedByMonth = expenses.reduce((acc, expense) => {
    const dateObj = new Date(expense.date);
    const monthYear = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(expense);

    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <HomeHeading />
      <NewExpense categories={categories} />

      {expenses && <ExpensesList expensesGroupedByMonth={expensesGroupedByMonth} categories={categories} />}
    </div>
  );
}
