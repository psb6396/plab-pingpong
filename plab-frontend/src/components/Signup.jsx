const Signup = () => {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false) // 회원가입 완료 상태 추가

   const handleSignup = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
         alert('모든 필드를 입력해주세요!')
         return
      }
      if (password !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }
      dispatch(registerUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => {
            //회원가입 성공시
            setIsSignupComplete(true) //회원가입 완료 상태 true로 변경
         })
         .catch((error) => {
            //회원가입중 에러 발생시
            console.error('회원가입 에러:', error)
         })
   }, [email, nick, password, confirmPassword, dispatch])
}

export default Signup
