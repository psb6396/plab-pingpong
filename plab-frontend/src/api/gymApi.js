import plabApi from './axiosApi'

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
