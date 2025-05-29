import React from 'react'


export default async function UserProfile({params}:any) {
  const {id} = await params
  return (
    <div className='text-center'> User Profile: {id} </div>
  )
}
