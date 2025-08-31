import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { FaSignOutAlt } from 'react-icons/fa'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="
        inline-flex items-center gap-3 px-6 py-3 rounded-full
        text-xl sm:text-2xl font-bold
        text-white bg-red-500
        transition-all duration-300 ease-in-out
        hover:bg-red-600 transform hover:scale-110 shadow-md
      "
    >
      <FaSignOutAlt className="text-2xl sm:text-3xl" />
      Logout
    </button>
  )
}

export default LogoutBtn
