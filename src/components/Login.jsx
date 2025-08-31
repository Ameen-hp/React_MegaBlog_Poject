import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen p-4 sm:p-6'>
            <div className={`
                mx-auto w-full max-w-lg bg-white rounded-xl p-8 sm:p-12
                border border-gray-200 shadow-xl
                transition-all duration-300 ease-in-out
            `}>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[120px] transition-transform-shadow duration-300 ease-in-out hover:scale-105">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-500">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-indigo-500 transition-all duration-200 hover:underline hover:text-indigo-600"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login