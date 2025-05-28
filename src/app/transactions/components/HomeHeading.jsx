import {
  Typography,
  Button,
} from '@mui/material';
import { signOutAction } from '@/app/actions';

export default function HomeHeading({user, expensesAfterIncome}) {
  return (
    <>
      <form action={signOutAction}>
        <Button type="submit" sx={{display: 'block', p: 0, mr: 0, ml: 'auto', fontSize: '0.75rem', mb: 2}}>
          Sign out
        </Button>
      </form>
      <Typography variant="body1" gutterBottom>
        Hi {user}!
      </Typography>
      <Typography>
        Total expenses this month: {expensesAfterIncome}
      </Typography>
    </>
  );
}