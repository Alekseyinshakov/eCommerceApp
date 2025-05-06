import './RegisterAlt.scss'

export function RegisterAlt() {
  return (
    <div className="log-in-alt">
      <div className="divider">
        <span className="divider__text">Or login with</span>
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
