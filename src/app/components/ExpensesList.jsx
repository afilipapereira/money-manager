import {
  Box,
  Typography,
  Stack,
} from '@mui/material';

import Category from '@/app/components/Category';

export default function ExpensesList({ expensesGroupedByMonth, categories }) {
  return (
    <>
      {Object.entries(expensesGroupedByMonth).map(([month, expenses]) => (

        <Box key={`expenses-group-${month}`} sx={{ marginTop: '3em'}}>
          <Typography variant="body2" sx={{ borderBottom: '1px solid black', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
            {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
          {expenses.map((expense, index) => {
            const category = categories.find((cat) => cat.id === expense.category);
            const date = new Date(expense.date);
            const dateFormatted = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            const [month, day] = dateFormatted.split(' ');

            const amountFormatted = new Intl.NumberFormat('en-IE', {
              style: 'currency',
              currency: 'EUR',
            }).format(expense.amount);

            return (
              <Box key={`expense-${index}`} sx={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                <Stack key={expense.id} 
                  direction="row" 
                  spacing={3}
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" sx={{ lineHeight: 1.3, textAlign: 'center', textTransform: 'uppercase', alignSelf: 'center' }}>{month}<br/>{day}</Typography>
                  <Box sx={{flexGrow: 1}}>
                    {expense.name}
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Category category={category} />
                    </Box>
                  </Box>
                  <Typography>{amountFormatted}</Typography>
                </Stack>
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
}