import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4 sm:p-6">
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
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-gray-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-indigo-500 transition-all duration-200 hover:underline hover:text-indigo-600"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                                minLength: 8, // Added minLength for password
                            })}
                        />
                        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup