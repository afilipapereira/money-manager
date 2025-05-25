'use client';

import {
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

import Category from './Category';

export default function NewExpenseForm({transaction = null, categories, handleSubmitSuccess, handleCloseTransactionDetail}) {
  const now = new Date();
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    name: transaction ? transaction.name : '',
    type: transaction ? transaction.type : 'expense',
    amount: transaction ? transaction.amount : '',
    shared_by: transaction ? transaction.shared_by : 1,
    salary: transaction ? transaction.salary : false,
    category: transaction ? transaction.category : '',
    date: transaction ? transaction.date : new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0],
    message: transaction ? transaction.message : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAmountValueChange = (values) => {
    setFormData((prev) => ({ ...prev, amount: values.value }));
  };
  const handleIsSalaryChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, salary: checked }));
  };
  const handleTransactionTypeChange = (event, transactionType) => {
    if(transactionType === 'income')
      setFormData((prev) => ({ ...prev, shared_by: 1, category: '15' }));
    setFormData((prev) => ({ ...prev, type: transactionType }));
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

    const action = e.nativeEvent.submitter.value; //"add", "update", "delete"

    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const updateFormData = [
      {
        type: formData.type,
        name: formData.name,
        amount: formData.amount / formData.shared_by,
        shared_by: formData.shared_by,
        salary: formData.salary,
        category: formData.category,
        date: formData.date,
        message: formData.message,
        user_id: user.data.user.id
      },
    ];

    let data = null;
    let userMessage = '';
    let consoleLogMessage = '';

    switch(action) {
      case 'add':
        data = await supabase.from('transactions').insert(updateFormData);
        userMessage = 'Something went wrong. Please check your inputs.';
        consoleLogMessage = 'Insert failed:';
        break;
      case 'update':
        data = await supabase.from('transactions').update(updateFormData).eq('id', transaction.id);

        userMessage = 'Something went wrong. Please check your inputs.';
        consoleLogMessage = 'Update failed:';
        break;
      case 'delete':
        data = await supabase.from('transactions').delete().eq('id', transaction.id);
        userMessage = 'Something went wrong. Please try again.';
        consoleLogMessage = 'Delete failed:';
        break;
    }

    if (data.error) {
      setFormError(userMessage);
      console.error(consoleLogMessage, data.error);
      return;
    } else {
      handleSubmitSuccess();
    }
  };


  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 10, padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} onClick={handleCloseTransactionDetail}>
      <Box
        onClick={e => e.stopPropagation()}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'relative',
          maxWidth: 400,
          width: '100%',
          height: '100%',
          mx: 'auto',
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          overflow: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseTransactionDetail}
          sx={(theme) => ({
            position: 'absolute',
            right: 0,
            top: 0,
            color: theme.palette.grey[500],
            zIndex: 100,
            padding: '10px'
          })}
        >
          <CloseIcon />
        </IconButton>

        <Stack sx={{ height: '100%' }}>
          <Box sx={{ pb: 6 }}>
            <Typography variant="h6" component="h6" sx={{ pb: 1 }}>
              Add new
            </Typography>
            <ToggleButtonGroup
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleTransactionTypeChange}
              required
              exclusive
            >
              <ToggleButton value="expense">Expense</ToggleButton>
              <ToggleButton value="income">Income</ToggleButton>
            </ToggleButtonGroup>
          </Box>

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
            sx={{ pb: 3 }}
          />

          <Stack
            direction="row"
            spacing={3}
            sx={{
              justifyContent: "space-between",
              pb: 3, 
            }}
          >
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
              sx={{ flexBasis: '40%', display: formData.type === 'income' ? 'none' : 'block' }}
            />
            
            <Box
              sx={{
                flexBasis: '40%',
                display: formData.type === 'income' ? 'block' : 'none',
              }}
            >
              <Typography
                variant="caption"
                sx={{ display: 'block', color: 'text.secondary', mb: 0.3 }}
              >
                Mark as salary?
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="salary"
                    checked={formData.salary}
                    onChange={handleIsSalaryChange}
                    sx={{ padding: 0, paddingLeft: '0.5em' }}
                  />
                }
              />
            </Box>
          </Stack>

          {categories && (
            <TextField
              label="Category"
              name="category"
              id="category"
              select
              value={formData.type === 'income' ? '15' : formData.category}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true, }}}
              fullWidth
              required
              variant="standard"
              disabled={formData.type === 'income'}
              sx={{ pb: 3 }}
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
            sx={{ pb: 3 }}
          />

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={3}
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            variant="standard"
            sx={{ pb: 3 }}
          />
          {transaction ?
            <Stack
              direction="row"
              spacing={1}
            >
              <Button variant="contained" value="update" type="submit" sx={{ flexGrow: 1,mt: 'auto' }}>
                Update
              </Button>
              <Button variant="outlined" value="delete" type="submit" sx={{ flexGrow: 1,mt: 'auto' }} color="error">
                Delete
              </Button>
            </Stack>
          : 
            <Button variant="contained" value="add" type="submit" sx={{ mt: 'auto' }}>
              Submit
            </Button>
    }
        </Stack>
      </Box>
    </Box>
  );
}
