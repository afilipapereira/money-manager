import HomeHeading from './components/HomeHeading';
import NewExpense from './components/NewExpense';
import ExpensesList from '@/app/components/ExpensesList';

import { supabase } from '@/utils/supabase/client';

export default async function Home() {
  const { data: expenses } = await supabase.from('expenses').select();
  const { data: categories } = await supabase.from('categories').select();

  return (
    <>
      <HomeHeading />
      <NewExpense categories={categories} />

      {expenses && <ExpensesList expenses={expenses} />}
    </>
  );
}
