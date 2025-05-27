import React from 'react'

export default function UserProfile({params}:any) {
  return (
    <div className='text-center'> User Profile: {params.id} </div>
  )
}
