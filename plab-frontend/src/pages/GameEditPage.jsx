import { Container } from '@mui/material'
import PostForm from '../components/post/PostForm'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGameByIdThunk, updateGameThunk } from '../features/gameSlice'

const GameEditPage = () => {
   const { id } = useParams() //post의 id
   const dispatch = useDispatch()

   const { game, loading, error } = useSelector((state) => state.games)

   //게시물 데이터 불러오기
   useEffect(() => {
      dispatch(fetchPostByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = useCallback(
      (postData) => {
         dispatch(updatePostThunk({ id, postData }))
            .unwrap()
            .then(() => {
               window.location.href = '/' // 수정 후 메인페이지로 이동
            })
            .catch((error) => {
               console.error('게시물 수정 중 오류 발생:', error)
               alert('게시물 수정에 실패했습니다.', error)
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩중</p>
   if (error) return <p>에러발생: {error}</p>

   return (
      <Container>
         <h1>게시물 수정</h1>
         {post && <PostForm onSubmit={handleSubmit} initialValues={post} />}
      </Container>
   )
}

export default GameEditPage
