//@ts-ignore
import s from './PolygonCanvas.module.scss'
import React, { useEffect, useRef } from 'react'
import { getBoundingRect } from '../../../../../utils/getBoundingRect'
import {Polygon} from "../../../../../redux/slices/mapSlice";

const PolygonCanvas: React.FC<{ polygon: Polygon }> = ({ polygon }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && polygon) {
      const draw = (ctx: CanvasRenderingContext2D | null, data: number[][]) => {

        const boundingRect = getBoundingRect(data)
        const scale = canvasRef.current
          ? Math.min(canvasRef.current.width, canvasRef.current.height)
          : 0

        ctx?.beginPath()

        for (const [latitude, longitude] of data) {
          const x = ((latitude - boundingRect.x) / boundingRect.width) * scale
          const y = ((longitude - boundingRect.y) / boundingRect.height) * scale

          ctx?.lineTo(x - 2, y - 5)
        }

        ctx?.fill()
        ctx?.stroke()
      }

      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.fillStyle = polygon.color

        draw(ctx, polygon.coords[0])
      }
    }
  }, [polygon])

  return (
    <canvas
      className={s.canvas}
      ref={canvasRef}
    />
  )
}

export default PolygonCanvas
