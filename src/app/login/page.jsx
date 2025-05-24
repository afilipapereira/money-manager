'use client';

import { SignInAction } from '@/app/actions';
import { 
  Paper, 
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Link
} from '@mui/material';


export default function LoginPage() {
  return (
    <Paper elevation={3} style={{ margin: '20px', minHeight: 'calc(100vh - 40px)' }}>
      <Box component="form" p={3}>
        <Stack sx={{ height: '100%' }}>
          <Typography variant="h6" component="h6" sx={{ pb: 7 }}>
            Sign in
          </Typography>
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

          <Button formAction={SignInAction} variant="contained" type="submit" sx={{ mt: 'auto', mb: 2 }}>
            Sign in
          </Button>
          <Button href="/sign-up" variant="outlined" sx={{ mt: 'auto' }}>
            Sign up
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}