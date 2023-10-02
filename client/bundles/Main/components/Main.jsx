import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'normalize.css'
import Game from './Game'

const queryClient = new QueryClient()

const Main = () => (
  <QueryClientProvider client={queryClient}>
    <Game />
  </QueryClientProvider>
)

export default Main
