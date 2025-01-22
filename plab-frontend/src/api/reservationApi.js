import plabApi from './axiosApi'

//게임 참가
export const applyGame = async (id) => {
  try {
    const response = await plabApi.post(`/reservation/${id}`)
    return response
  } catch (error) {
    console.error(`API Request 오류: ${error.message}`)
    throw error
  }
}
