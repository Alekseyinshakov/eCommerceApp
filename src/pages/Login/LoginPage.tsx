import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <>
      <div>LoginPage</div>
      <span>
        <Link to="/sign-up">sign-up</Link>
      </span>
      <span> </span>
      <span>
        <Link to="/home">home</Link>
      </span>
    </>
  )
}
