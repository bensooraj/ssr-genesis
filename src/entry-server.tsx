import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import { createMemoryHistory } from '@tanstack/react-router'
import { StartServer } from '@tanstack/start/server'
import { createRouter } from './router'
import express from 'express'

export async function render({ url, template, ssrManifest, req, res }: {
  url: string,
  template: string,
  ssrManifest: string | undefined,
  req: express.Request
  res: express.Response
}) {
  console.log("url: ", url)
  // console.log("response", res)
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

  const html = template
      .replace(`<!--app-html-->`, appHtml ?? '')

  res.statusCode = router.hasNotFoundMatch() ? 404 : 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`<!DOCTYPE html>${html}`)
  return { html }
}
