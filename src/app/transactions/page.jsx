import TransactionsSection from '@/app/components/transactions/TransactionsSection';

import { createClient } from '@/utils/supabase/server';

export default async function Transactions() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const { data: dataUser } = await supabase.from('profiles').select('name').eq('id', data.user.id).single();
  const { data: categories, error: catError } = await supabase.from('categories').select();

  return (
    <div style={{ padding: '20px' }}>
      <TransactionsSection categories={categories} user={dataUser.name} />
    </div>
  );
}
