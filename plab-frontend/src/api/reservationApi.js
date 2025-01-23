import plabApi from './axiosApi'

//게임 참가
export const applyGame = async (gameId) => {
   try {
      const response = await plabApi.post(`/reservation/${gameId}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
