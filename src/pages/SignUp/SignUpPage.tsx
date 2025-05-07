import { Link } from 'react-router-dom'

export function SignUpPage() {
  return (
    <>
      <div>LoginPage</div>
      <span>
        <Link to="/log-in">log-in</Link>
      </span>
      <span> </span>
      <span>
        <Link to="/home">home</Link>
      </span>
    </>
  )
}
