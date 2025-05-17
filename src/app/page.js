'use client';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Fab,
  Typography,
} from '@mui/material';

import { useState } from 'react';

import NewExpense from '@/app/components/forms/NewExpense';

export default function Home() {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const handleNewExpenseOpen = () => {
    setNewExpenseOpen(true);
  };
  const handleNewExpenseClose = () => {
    setNewExpenseOpen(false);
  };

  return (
    <Box>
      <Box sx={{ position: 'relative', height: '100vh', padding: '15px' }}>
        <Typography variant="h6" component="h1" gutterBottom>
          Hi Filipa!
        </Typography>

        {newExpenseOpen && <NewExpense/>}
        
        {!newExpenseOpen && (
          <Fab color="primary" 
              aria-label="add"
              sx={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
              }}
              >
            <AddIcon onClick={handleNewExpenseOpen}/>
          </Fab>
        )}
      </Box>
    </Box>
  );
}
