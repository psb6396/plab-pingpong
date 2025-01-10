import React from 'react'
import {
  Typography,
  Button,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGymsThunk } from '../features/gymSlice'
import { makeInitialDate } from '../utils/datetime'

const GameForm = ({ onSubmit, initialGame }) => {
  const dispatch = useDispatch()
  const { gyms, loading, error } = useSelector((state) => state.gyms)
  useEffect(() => {
    dispatch(fetchGymsThunk())
  }, [dispatch])
  const [selectedGymId, setSelectedGymId] = useState(
    initialGame ? initialGame.GymId : null
  )
  const [selectedDate, setSelectedDate] = useState(
    initialGame
      ? makeInitialDate(initialGame.datetime)
      : () => {
          const today = new Date()
          return new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          )
        }
  )
  const [selectedTime, setSelectedTime] = useState(null)
  const [maximumPeople, setMaximumPeople] = useState(null)
  const [minimumPeople, setMinimumPeople] = useState(null)

  const onClickSubmit = useCallback((e) => {
    e.preventDefault()

    if (!selectedGymId) {
      alert('체육관을 입력하세요.')
      return
    }

    if (!selectedDate) {
      alert('날짜를 입력하세요.')
      return
    }

    if (!selectedTime) {
      alert('시간을 입력하세요.')
      return
    }

    if (!maximumPeople) {
      alert('최대인원을 입력하세요.')
      return
    }

    if (!minimumPeople) {
      alert('최소인원을 입력하세요.')
      return
    }

    // const isodate = selectedDate.toString().substring(0, 10) //엄밀히 따지면 ISO 는 아닐듯
    // const date = selectedDate.toString()
    const date = selectedDate

    console.log('submit할때 date값:', date)

    const formData = new FormData()
    formData.append('gymId', selectedGymId)
    formData.append('date', date)
    formData.append('time', selectedTime)
    formData.append('maxPeople', maximumPeople)
    formData.append('minPeople', minimumPeople)

    onSubmit(formData)
  })

  let age
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
              게임매치 생성
            </Typography>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>체육관</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedGymId}
                    label='체육관'
                    onChange={(e) => setSelectedGymId(e.target.value)}
                  >
                    {gyms.map((gym) => (
                      <MenuItem value={gym.id}>{gym.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='날짜'
                  variant='outlined'
                  type='date'
                  value={selectedDate.toISOString().substring(0, 10)}
                  // value={selectedDate.toDateString()}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>시간</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedTime}
                    label='time'
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    {Array.from({ length: 23 }, (_, i) => i + 1).map((hour) => (
                      <MenuItem value={hour}>
                        {hour.toString().padStart(2, '0')}:00
                        {/* {console.log(hour)} */}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='최대 인원'
                  variant='outlined'
                  type='number'
                  value={maximumPeople}
                  onChange={(e) => setMaximumPeople(e.target.value)}
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='최소 인원'
                  variant='outlined'
                  type='number'
                  value={minimumPeople}
                  onChange={(e) => setMinimumPeople(e.target.value)}
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={onClickSubmit}
                  fullWidth
                  variant='contained'
                  color='primary'
                >
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
