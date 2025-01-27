import plabApi from './axiosApi'

//회원가입
export const registerUser = async (userData) => {
  try {
    //userData: 회원가입 창에서 입력한 데이터
    const response = await plabApi.post('/auth/join', userData)
    return response
  } catch (error) {
    console.error(`API request 오류: ${error.message}`)
    throw error //request 할떄 오류 발생시 에러르 registerUser() 함수를 실행한 곳으로 던짐
  }
}

//로그인
export const loginUser = async (credentials) => {
  try {
    const response = await plabApi.post('/auth/login', credentials)
    return response
  } catch (error) {
    console.error(`API request 오류: ${error.message}`)
    throw error
  }
}

export const googleLoginUser = async () => {
  try {
    const response = await plabApi.get('/auth/google')
    return response
  } catch (error) {
    console.error(`API request 오류: ${error.message}`)
    throw error
  }
}

//로그인 상태확인
export const checkAuthStatus = async () => {
  try {
    const response = await plabApi.get('/auth/status')
    return response
  } catch (error) {
    console.error(`API Request 오류: ${error.message}`)
    throw error
  }
}

//로그아웃
export const logoutUser = async () => {
  try {
    const response = await plabApi.get('/auth/logout')
    return response
  } catch (error) {
    console.error(`API request 오류: ${error.message}`)
    throw error
  }
}
