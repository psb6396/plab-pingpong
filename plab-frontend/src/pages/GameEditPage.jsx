import { Container } from '@mui/material'
// import PostForm from '../components/post/PostForm'
import GameForm from '../components/GameForm'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGameByIdThunk } from '../features/gameSlice'

const GameEditPage = () => {
  const { id } = useParams() //post의 id
  const dispatch = useDispatch()

  const { gamedate, game, loading, error } = useSelector((state) => state.games) // 해당 게임에 대한 기존정보.
  //게시물 데이터 불러오기
  useEffect(() => {
    dispatch(fetchGameByIdThunk(id))
  }, [dispatch, id])

  const handleSubmit = useCallback()
  // ((gameData) => {
  //    dispatch(updatePostThunk({ id, gameData }))
  //       .unwrap()
  //       .then(() => {
  //          window.location.href = '/profile' // 수정 후 메인페이지로 이동
  //       })
  //       .catch((error) => {
  //          console.error('게시물 수정 중 오류 발생:', error)
  //          alert('게시물 수정에 실패했습니다.', error)
  //       })
  // },
  // [dispatch, id])

  if (loading) return <p>로딩중</p>
  if (error) return <p>에러발생: {error}</p>

  console.log('game:', game)
  console.log('gamedate:', gamedate)
  return (
    <>
      <h1>게임매칭 수정</h1>
      {game && (
        <GameForm
          onSubmit={handleSubmit}
          initialGame={game}
          initialDate={gamedate}
        />
      )}
    </>
  )
}

export default GameEditPage
