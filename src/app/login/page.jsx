'use client';

import React from 'react';
import { SignInAction } from '@/app/actions';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import { useEffect } from 'react';

import PopUpContainer from '@/app/components/ui/PopUpContainer';


export default function LoginPage({ searchParams }) {
  const { error } = React.use(searchParams);

  useEffect(() => {
    if (typeof window !== 'undefined' && error) {
      const url = new URL(window.location);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url);
    }
  }, []);

  return (
    <PopUpContainer>
      <Box component="form">
        <Stack sx={{ height: '100%' }}>
          <Typography variant="h6" component="h6" sx={{ pb: 5 }}>
            Sign in
          </Typography>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            variant="standard"
            sx={{ pb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            variant="standard"
            sx={{ pb: 2 }}
          />

          {error && <Typography variant="body2" pb={3} color="error">{error}</Typography>}

          <Button formAction={SignInAction} variant="contained" type="submit" sx={{ mt: 4, mb: 2 }}>
            Sign in
          </Button>
          <Button href="/sign-up" variant="outlined" sx={{ mt: 'auto' }}>
            Sign up
          </Button>
        </Stack>
      </Box>
    </PopUpContainer>
  )
}