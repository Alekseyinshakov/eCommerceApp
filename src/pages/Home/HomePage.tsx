import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <div>Home</div>
      <span>
        <Link to="/sign-up">sign-up</Link>
      </span>
      <span> </span>
      <span>
        <Link to="/log-in">log-in</Link>
      </span>
    </>
  )
}
