import { useLocation } from 'react-router-dom'
import './RegisterAlt.scss'

export function RegisterAlt() {
  const location = useLocation()
  const currentPath = location.pathname

  const setPrase =
    currentPath === '/log-in' ? 'Or login with' : 'Or register with'

  return (
    <div className="log-in-alt">
      <div className="divider">
        <span className="divider__text">{setPrase}</span>
      </div>
      <button className="log-in-alt__button" type="submit">
        Login with Google
      </button>
      <button className="log-in-alt__button" type="submit">
        Login with Facebook
      </button>
    </div>
  )
}
