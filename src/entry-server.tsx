import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import { createMemoryHistory } from '@tanstack/react-router'
import { StartServer } from '@tanstack/start/server'
import { createRouter } from './router'
// import { Response } from 'express'

export async function render(url: string, response: any) {
  console.log("url", url)
  console.log("response", response)
  const router = createRouter()

  const memoryHistory = createMemoryHistory({
    initialEntries: [url],
  })

  router.update({
    history: memoryHistory,
  })

  await router.load()

  const appHtml = renderToString(
    <StrictMode>
      <StartServer router={router} />
    </StrictMode>,
  )
  // return { appHtml }

  response.statusCode = router.hasNotFoundMatch() ? 404 : 200
  response.setHeader('Content-Type', 'text/html')
  response.end(`<!DOCTYPE html>${appHtml}`)
}
