import {
  Typography,
} from '@mui/material';


export default function HomeHeading({expensesAfterIncome}) {
  return (
    <>
      <Typography variant="h6" component="h1" gutterBottom>
        Hi Filipa!
      </Typography>
      <Typography>
        Total expenses this month: {expensesAfterIncome}
      </Typography>
    </>
  );
}