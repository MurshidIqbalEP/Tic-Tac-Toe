import React from 'react'
import Confetti from 'react-confetti'

export default () => {
  return (
    <Confetti
     
      drawShape={ctx => {
        ctx.beginPath()
        ctx.moveTo(5, -10)
        ctx.lineTo(10, 10)
        ctx.lineTo(-10, 10)
        ctx.closePath()
        ctx.fill()
      }}
    />
  )
}
