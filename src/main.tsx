import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './animate.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import TranslateProvider from './provider/provider/translate.provider.tsx'
import { ConfigProvider } from 'antd'
import { customTheme } from './theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslateProvider>
      <BrowserRouter>
        <ConfigProvider theme={customTheme}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </TranslateProvider>
  </StrictMode>,
)
