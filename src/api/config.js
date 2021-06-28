const devPort = 3000

const URLMapping = {
  production: 'https://api.bowlofnoodles.top/music',
  development: `http://localhost:${devPort}`
}

export const URL = URLMapping[process.env.NODE_ENV]
