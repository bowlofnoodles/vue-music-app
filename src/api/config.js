const devPort = 3000

const URLMapping = {
  production: 'https://music-api.bowlofnoodles.top',
  development: `http://localhost:${devPort}`
}

export const URL = URLMapping[process.env.NODE_ENV]
