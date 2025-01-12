import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

//axios 인스턴스 생성
const plabApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키를 요청에 포함
})

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
    // console.log('sadf')
    const response = await plabApi.post('/auth/login', credentials)
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

//내 프로필 가져오기
export const getProfile = async () => {
  try {
    const response = await plabApi.get(`/page/profile`)
    console.log('getProfile')
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
