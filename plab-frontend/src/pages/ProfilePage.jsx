import Profile from '../components/Profile'

const ProfilePage = ({ isAuthenticated, user }) => {
   return (
      <>
         <Profile isAuthenticated={isAuthenticated} user={user} />
      </>
   )
}

export default ProfilePage
