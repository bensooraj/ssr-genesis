import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { StartClient } from '@tanstack/start'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
)
