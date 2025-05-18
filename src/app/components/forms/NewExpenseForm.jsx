'use client';

import {
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
  Typography
} from '@mui/material';
import { NumericFormat } from 'react-number-format';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsSubwayFilledIcon from '@mui/icons-material/DirectionsSubwayFilled';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ChairIcon from '@mui/icons-material/Chair';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { useState } from 'react';

import { supabase } from '@/utils/supabase/client';
import { Payments } from '@mui/icons-material';

export const categoryIconMap = {
  shopping: ShoppingCartIcon,
  fixed_expenses: PaymentsIcon,
  eat_out: RestaurantIcon,
  public_transports: DirectionsSubwayFilledIcon,
  car: DirectionsCarIcon,
  for_me: PersonIcon,
  entertainment: TheaterComedyIcon,
  health: HealthAndSafetyIcon,
  vacation: BeachAccessIcon,
  house: ChairIcon,
  subscriptions: SubscriptionsIcon,
  gifts: CardGiftcardIcon,
  education: SchoolIcon,
  bank: AccountBalanceIcon,
};

export default function NewExpenseForm({categories, handleNewExpenseClose}) {

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    shared_by: '',
    category: '',
    date: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAmountValueChange = (values) => {
    setFormData((prev) => ({ ...prev, amount: values.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('expenses').insert([
      {
        name: formData.name,
        amount: formData.amount,
        shared_by: formData.shared_by,
        category: formData.category,
        date: formData.date,
        message: formData.message,
      },
    ]);

    if (error) console.error('Insert failed:', error);
  };

  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 10, padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} onClick={handleNewExpenseClose}>
      <Box
        onClick={e => e.stopPropagation()}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: '100%',
          height: '100%',
          mx: 'auto',
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Stack sx={{ height: '100%' }}>
          <Typography variant="h6" component="h6" sx={{ pb: 5 }}>
            Add new expense
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            required
            variant="standard"
            sx={{ pb: 2 }}
          />
          <NumericFormat
            label="Amount"
            name="amount"
            value={formData.amount}
            onValueChange={handleAmountValueChange}
            customInput={TextField}
            slotProps={{ inputLabel: { shrink: true, }}}
            valueIsNumericString
            prefix="€"
            fullWidth
            required
            variant="standard"
            sx={{ pb: 2 }}
          />
          <TextField
            label="Shared by"
            name="shared_by"
            value={formData.shared_by}
            type="number"
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            variant="standard"
            sx={{ pb: 2 }}
          />
          
          {categories && (
            <TextField
              label="Category"
              name="category"
              id="category"
              select
              value={formData.category}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true, }}}
              fullWidth
              required
              variant="standard"
              sx={{ pb: 2}}
            >
              {categories.map((category) => {
                const Icon = categoryIconMap[category.icon_key] || PaymentsIcon;

                return (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon fontSize="small" sx={{ mr: 1 }} />
                      {category.name}
                    </Box>
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            variant="standard"
            sx={{ pb: 2 }}
          />

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            variant="standard"
            sx={{ pb: 2 }}
          />

          <Button variant="contained" type="submit" sx={{ mt: 'auto' }}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
