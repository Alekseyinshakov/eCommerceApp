import { Link, Params, useMatches } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'

type Crumbs = {
  breadcrumb:
    | string
    | ((params: Params) => string)
    | ((params: Params) => Array<{ name: string; path: string }>)
}

export const BreadCrumbs = () => {
  const matches = useMatches()
  const crumbs: Array<{ name: string; path: string }> = []

  for (const match of matches) {
    const handel = match.handle as Crumbs | undefined

    if (!handel?.breadcrumb) continue
    const { breadcrumb } = handel
    if (typeof breadcrumb === 'function') {
      const result = breadcrumb(match.params)
      if (Array.isArray(result)) {
        crumbs.push(...result)
      } else {
        crumbs.push({
          name: result,
          path: match.pathname,
        })
      }
    } else {
      crumbs.push({
        name: breadcrumb,
        path: match.pathname,
      })
    }
  }

  console.log(crumbs)

  return (
    <nav className={styles.breadCrumbs}>
      {crumbs.slice(0, -1).map((crumb) => (
        <span key={crumb.name}>
          <Link to={crumb.path}>{crumb.name}</Link>
          {' / '}
        </span>
      ))}
      <span className={styles.lastCrumb}>{crumbs[crumbs.length - 1].name}</span>
    </nav>
  )
}
