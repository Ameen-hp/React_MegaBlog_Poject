import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full mb-4'>
            {label && <label
                htmlFor={id}
                className='block text-sm font-medium text-gray-700 mb-1 pl-1'
            >
                {label}
            </label>
            }
            <input
                type={type}
                className={`
                    flex h-10 w-full rounded-md border border-gray-300 bg-white
                    px-3 py-2 text-sm placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50
                    shadow-sm
                    transition-all duration-300 ease-in-out
                    hover:border-indigo-400 focus:border-indigo-500
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input