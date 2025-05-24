'use client';

import Link from 'next/link';
import { signup } from './actions';
import { 
  Paper, 
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material';


export default function LoginPage() {
  return (
    <Paper elevation={3} style={{ margin: '20px', minHeight: 'calc(100vh - 40px)' }}>
      <Box component="form" p={3}>
        <Stack sx={{ height: '100%' }}>
          <Typography variant="h6" component="h6" sx={{ pb: 7 }}>
            Sign up
          </Typography>
          <TextField
            label="Name"
            name="name"
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            required
            variant="standard"
            sx={{ pb: 3 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            required
            variant="standard"
            sx={{ pb: 3 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            slotProps={{ inputLabel: { shrink: true, }}}
            fullWidth
            required
            variant="standard"
            sx={{ pb: 3 }}
          />

          <Button formAction={signup} variant="contained" type="submit" sx={{ mt: 'auto' }}>
            Sign up
          </Button>
          <Typography variant="body2" sx={{ m: 'auto', mt: 2, mb: 1 }}>
            Already have an account? <Link href="/login" style={{ textDecoration: 'none',  color: 'inherit' }}>Sign in</Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  )
}