'use client';

import {
  Box,
  Typography,
  Stack,
} from '@mui/material';

import Category from '@/app/components/Category';

export default function TransactionsList({ transactions, categories }) {

  const transactionsGroupedByMonth = transactions.reduce((acc, expense) => {
    const dateObj = new Date(expense.date);
    const monthYear = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(expense);

    return acc;
  }, {});

  return (
    <>
      {Object.entries(transactionsGroupedByMonth).map(([month, transactions]) => (

        <Box key={`transactions-group-${month}`} sx={{ marginTop: '3em'}}>
          <Typography variant="body2" sx={{ borderBottom: '1px solid black', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
          
          {transactions.map((transaction, index) => {
            const category = categories.find((cat) => cat.id === transaction.category);
            const date = new Date(transaction.date);
            const dateFormatted = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            const [month, day] = dateFormatted.split(' ');

            const amountFormatted = new Intl.NumberFormat('en-IE', {
              style: 'currency',
              currency: 'EUR',
            }).format(transaction.amount);

            const totalAmountFormatted = new Intl.NumberFormat('en-IE', {
              style: 'currency',
              currency: 'EUR',
            }).format(transaction.shared_by * transaction.amount);

            return (
              <Box key={`transaction-${index}`} sx={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                <Stack key={transaction.id}
                  direction="row"
                  spacing={3}
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" sx={{ lineHeight: 1.3, textAlign: 'center', textTransform: 'uppercase', alignSelf: 'center' }}>{month}<br/>{day}</Typography>
                  <Box sx={{flexGrow: 1}}>
                    {transaction.name}
                    <small>{transaction.shared_by > 1 && ` ${totalAmountFormatted}`}</small>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Category category={category} />
                    </Box>
                  </Box>
                  <Typography sx={{color: transaction.type === 'expense' ? 'red' : 'green'}}>{amountFormatted}</Typography>
                </Stack>
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
}