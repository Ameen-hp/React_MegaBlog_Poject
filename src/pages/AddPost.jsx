import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 bg-gray-50 min-h-screen'>
      <Container className='animate-fade-in'>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost