import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Paper,
} from '@mui/material'
import Grid from '@mui/material/Grid2'

const GameForm = () => {
  return (
    <div>
      {/* Match Creation Form */}
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ minHeight: '80vh' }}
      >
        <Paper
          style={{ padding: 20, width: '400px', backgroundColor: '#f5f5f5' }}
        >
          <form>
            <Typography variant='h6' style={{ marginBottom: 20 }}>
              매치 생성
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label='체육관' variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='지역' variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='세부주소' variant='outlined' />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='날짜 및 시간'
                  variant='outlined'
                  type='datetime-local'
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='최대 인원'
                  variant='outlined'
                  type='number'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='최소 인원'
                  variant='outlined'
                  type='number'
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant='contained' color='primary'>
                  매치 생성
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#e0e0e0',
          marginTop: 20,
        }}
      >
        <Typography variant='caption'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </footer>
    </div>
  )
}

export default GameForm
