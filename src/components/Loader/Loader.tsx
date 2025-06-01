import { CircleLoader } from 'react-spinners'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.wrapperLoader} role="status">
      <CircleLoader color="#46a358" size={100} />
    </div>
  )
}
export default Loader
