import { createRoot } from 'react-dom/client'
import './index.scss'
import Home from './components/pages/home/Home'
import { Provider } from 'react-redux'
import { store } from './store/store'
import TypingProvider from './provider/TypingProvider'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <TypingProvider>
      <Home />
    </TypingProvider>
  </Provider>
)
