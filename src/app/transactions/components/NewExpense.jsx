'use client';

import { useState } from 'react';

import {
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import NewExpenseForm from './NewExpenseForm';

export default function NewExpense({onTransactionAdded, categories}) {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const handleNewExpenseOpen = () => {
    setNewExpenseOpen(true);
  };
  const handleNewExpenseClose = () => {
    setNewExpenseOpen(false);
  };

  const handleSubmitSuccess = () => {
    setNewExpenseOpen(false);
    onTransactionAdded();
  }

  return(
    <>
    {!newExpenseOpen && (
      <Fab color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '15px',
          right: '15px',
        }}
      >
        <AddIcon onClick={handleNewExpenseOpen} />
      </Fab>
    )}
      {newExpenseOpen && <NewExpenseForm categories={categories} handleNewExpenseClose={handleNewExpenseClose} handleSubmitSuccess={handleSubmitSuccess}/>}
    </>
  );
}