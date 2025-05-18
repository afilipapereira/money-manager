import {
  Box,
  Typography,
} from '@mui/material';

export default function ExpensesList({ expenses }) {
  return (
    <Box>
      {expenses.map((expense) => (
        <Box key={expense.id} sx={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <Typography variant="h6">{expense.name}</Typography>
          <Typography variant="body1">Amount: {expense.amount}</Typography>
          <Typography variant="body2">Shared by: {expense.shared_by}</Typography>
          <Typography variant="body2">Category: {expense.category}</Typography>
          <Typography variant="body2">Date: {expense.date}</Typography>
          <Typography variant="body2">Message: {expense.message}</Typography>
        </Box>
      ))}
    </Box>
  );
}