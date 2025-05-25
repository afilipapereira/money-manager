import { 
  Paper, 
  Stack,
  Box
} from '@mui/material';

export default function PopUpContainer({ children }) {
  return (
    <Stack sx={{ height: '100vh' }} direction="column" justifyContent="center" alignContent="center" alignItems="center">
      <Paper 
        elevation={3} 
        sx={{ 
          minWidth: { xs: 'calc(100% - 20px*2)', sm: '400px' },
          margin: '20px',
        }}>
        <Box p={3}>
          {children}
        </Box>
      </Paper>
    </Stack>
  );
}
