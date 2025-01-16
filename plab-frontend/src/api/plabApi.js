import plabApi from './axiosApi'

//내 프로필 가져오기
export const getProfile = async () => {
   try {
      const response = await plabApi.get(`/page/profile`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게임매칭 등록
export const createGame = async (gameData) => {
   try {
      const response = await plabApi.post('/game', gameData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게임 수정
export const updateGame = async (id, gameData) => {
   try {
      const response = await plabApi.put(`/game/${id}`, gameData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게임 삭제
export const deleteGame = async (id) => {
   try {
      const response = await plabApi.delete(`/game/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//전체 체육관 가져오기
export const getGyms = async () => {
   try {
      const response = await plabApi.get(`/gym`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//매니저 프로필에서 생성한 게임 가져오기
export const getCreatedGames = async () => {
   try {
      const response = await plabApi.get(`/game/created`)
      // console.log('getCreatedGames')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//특정 게임 가져오기
export const getGameById = async (id) => {
   try {
      const response = await plabApi.get(`/game/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
