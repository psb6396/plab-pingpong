import GameForm from '../components/GameForm'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { createGameThunk } from '../features/gameSlice'
const GameCreatePage = () => {
  const dispatch = useDispatch()
  const handleSubmit = useCallback(
    (gamedata) => {
      //postData: 사용자가 입력한 게시물데이터
      /*
      postData = {
          content : '여행중입니다',
          hashtags: '#여행 #맛집',
          img: 파일객체,
      }
      */
      dispatch(createGameThunk(gamedata))
        .unwrap()
        .then(() => {
          // window.location.href = '/profile' //페이지 이동 -> 전체 페이지 새로고침
        })
        .catch((error) => {
          console.error('게임매치 등록 에러:', error)
          alert('게임매치 등록에 실패했습니다.', error)
        })
    },
    [dispatch]
  )
  return (
    <>
      <GameForm onSubmit={handleSubmit} />
    </>
  )
}

export default GameCreatePage
