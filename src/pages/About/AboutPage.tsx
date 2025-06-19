import { useState } from 'react'
import styles from './AboutPage.module.scss'
import { teamMembers } from './aboutData'
import { TeamMemberBlock } from '@components/TeamMemberBlock/TeamMemberBlock'

export const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleClose(index: number): void {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className={`container ${styles.margin}`}>
      <div className={styles.logoBlock}>
        <p className={styles.school}>Work from course:</p>
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className={styles.logo}
        ></a>
      </div>

      <div className={styles.about}>
        {teamMembers.map((member, index) => (
          <TeamMemberBlock
            key={index}
            member={member}
            isActive={index === activeIndex}
            onClick={() => handleClose(index)}
          />
        ))}
      </div>
    </div>
  )
}
