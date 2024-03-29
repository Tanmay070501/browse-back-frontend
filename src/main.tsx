import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import rrwebPlayer from 'rrweb-player'
import { event } from './event.ts'

// new rrwebPlayer({
//   target: document.body,
//   props: {
//      events: event,
//      autoPlay: false,
//      showController: true,
//      triggerFocus: true
//   }
// })

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />,
)
