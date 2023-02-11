import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import shareVideo from '../assets/share.mp4'
import { client } from '../sanityClient'

import { logoWhite } from '../components'

const Login = () => {

  const navigate = useNavigate()

  const responseGoogle = (response) => {
    let user = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(user))
    
    const doc = {
      _id: user.sub,
      _type: 'user',
      userName: user.name,
      image: user.picture
    }

    client.createIfNotExists(doc)
      .then(() => navigate('/', { replace: true }))
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logoWhite} width='130px' alt='logo' />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId=''
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onError={responseGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login