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
