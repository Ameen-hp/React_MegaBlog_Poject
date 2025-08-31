import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full mb-4'>
        {label && (
            <label 
                htmlFor={id} 
                className='block text-sm font-medium text-gray-700 mb-1 pl-1'
            >
                {label}
            </label>
        )}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`
                px-4 py-2 rounded-md bg-white text-gray-900 shadow-sm
                transition-all duration-300 ease-in-out
                border border-gray-300
                w-full
                hover:border-gray-400
                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                ${className}
            `}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
})

export default Select