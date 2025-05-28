import { 
  Paper, 
  Stack,
  Box
} from '@mui/material';

export default function PopUpContainer({ children, handleBackdropClick = null }) {
  return (
    <Stack onClick={handleBackdropClick} sx={{ width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} direction="column" justifyContent="center" alignContent="center" alignItems="center">
      <Paper 
        onClick={(e) => e.stopPropagation()}
        elevation={3} 
        sx={{ 
          minWidth: { xs: 'calc(100% - 20px*2)', sm: '400px' },
          minHeight: '400px',
          margin: '20px',
          position: 'relative',
        }}>
        <Box p={3}>
          {children}
        </Box>
      </Paper>
    </Stack>
  );
}
