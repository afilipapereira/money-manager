import {
  Typography,
} from '@mui/material';


export default function HomeHeading({user, expensesAfterIncome}) {
  return (
    <>
      <Typography variant="h6" component="h1" gutterBottom>
        Hi {user}!
      </Typography>
      <Typography>
        Total expenses this month: {expensesAfterIncome}
      </Typography>
    </>
  );
}