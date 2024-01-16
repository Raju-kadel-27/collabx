import React, { useEffect } from 'react'
import { Pricing } from '../components/pricing/Pricing'
import { Testimonials } from '../components/testimonials'
import Navbar from '../../../shared/components/Navbar/Navbar'
import { Polygons } from '../components/backgroundPolygons/Polygons'
import { LandingPage } from '../../home-page/components/LandingPage/LandingPage'
import { getSocket, testSocket } from '../../../shared/helpers/socket'

export const PublicPage = () => {
  // const socket1 = getSocket()
  // const socket2 = testSocket()

  const handleMessage = (message) => {
    console.log('message received', message)
  }

  // useEffect(() => {

  //   socket1.emit('chatMessage', 'Message from client1')
  //   socket2.emit('chatMessage', 'Message from client2')

  //   socket2.on('chatMessage', handleMessage)
  //   socket2.on('messageFromServerA', handleMessage)
  //   socket2.on('hello', handleMessage)
  //   socket2.on('inside', handleMessage)
  //   socket2.on('redis', handleMessage)

  //   socket1.on('chatMessage', handleMessage)
  //   socket1.on('messageFromServerA', handleMessage)
  //   socket1.on('hello', handleMessage)
  //   socket1.on('inside', handleMessage)
  //   socket1.on('redis', handleMessage)

  //   return () => {

  //     socket2.off('chatMessage', handleMessage)
  //     socket2.off('messageFromServerA', handleMessage)
  //     socket2.off('hello', handleMessage)
  //     socket2.off('inside', handleMessage)
  //     socket2.off('redis', handleMessage)

  //     socket1.off('chatMessage', handleMessage)
  //     socket1.off('messageFromServerA', handleMessage)
  //     socket1.off('hello', handleMessage)
  //     socket1.off('inside', handleMessage)
  //     socket1.off('redis', handleMessage)
  //   }
  // }, [])

  return (
    <>
      {/* <Navbar /> */}
      <LandingPage />
      <Pricing />
      {/* <Polygons /> */}
      <Testimonials />
    </>
  )
}
