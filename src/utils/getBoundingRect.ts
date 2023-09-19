
export function getBoundingRect(data: number[][]) {
  let left = Infinity
  let right = -Infinity
  let top = Infinity
  let bottom = -Infinity

  for (const [latitude, longitude] of data) {
    if (left > latitude) left = latitude
    if (top > longitude) top = longitude
    if (right < latitude) right = latitude
    if (bottom < longitude) bottom = longitude
  }
  return { x: left, y: top, width: right - left, height: bottom - top }
}
