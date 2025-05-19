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
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

import Category from '@/app/components/Category';

export default function NewExpenseForm({categories, handleNewExpenseClose, handleSubmitSuccess}) {
  const now = new Date();
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    shared_by: 1,
    category: '',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0].replace(/-/g, '/'),
    message: '',
  });
console.log('formData', formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAmountValueChange = (values) => {
    setFormData((prev) => ({ ...prev, amount: values.value }));
  };

  const validateForm = (data) => {
    if (!data.name) return 'Name is required';
    if (!data.amount || isNaN(data.amount)) return 'Amount must be a number';
    if (!data.shared_by || data.shared_by <= 0) return '"Shared by" field must be higher than 0.';
    if (!data.date) return '"Date" field is required.';
    return null; // no error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);
    const errorMsg = validateForm(formData);
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }

    const { error } = await supabase.from('transactions').insert([
      {
        name: formData.name,
        amount: formData.amount / formData.shared_by,
        shared_by: formData.shared_by,
        category: formData.category,
        date: formData.date,
        message: formData.message,
      },
    ]);

    if (error) {
      setFormError('Something went wrong. Please check your inputs.');
      console.error('Insert failed:', error);
    } else {
      handleSubmitSuccess();
    }
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
          {formError && <Typography sx={{ pb: 1 }} color="error">{formError}</Typography>}

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
              {categories.map((category) =>  (
                <MenuItem key={category.id} value={category.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Category category={category} />
                  </Box>
                </MenuItem>
              ))}
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
