import { useAuthPageText } from '@hooks/useAuthPageText'
import './RegisterAlt.scss'

export function RegisterAlt() {
  const { thirdPartyText, btnText } = useAuthPageText()

  return (
    <div className="log-in-alt">
      <div className="divider">
        <span className="divider__text">{thirdPartyText}</span>
      </div>
      <button className="log-in-alt__button" type="submit">
        {btnText} with Google
      </button>
      <button className="log-in-alt__button" type="submit">
        {btnText} with Facebook
      </button>
    </div>
  )
}
