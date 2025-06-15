import { useState } from 'react'
import styles from './AboutPage.module.scss'

type TeamMember = {
  name: string
  role: string
  bio: string
  github: string
  photo: string
  contributions: string
  teamCollaboration: string
  reviews: string[]
}

type TeamMemberBlockProps = {
  member: TeamMember
  isActive: boolean
  onClick: () => void
}

const teamMembers = [
  {
    name: 'Aleksei Inshakov',
    role: 'Team Lead',
    bio: 'Oversaw project structure, coordinated the team, and ensured consistent architecture.',
    github: 'https://github.com/Alekseyinshakov',
    photo: '/photos/aleksey.jpg',
    contributions:
      'Provided project structure, handled architecture choices, and ensured code quality across the board.',
    teamCollaboration:
      'Initiated the project’s communication in Discord, managed task distribution via GitHub Projects, and introduced Zustand for scalable state management with React.',
    reviews: [
      'Alex: Aleksey kept the team organized and always helped clarify complex issues.',
      'Inna: His support helped us focus on our individual tasks with confidence.',
      'A motivated and thoughtful leader who always sees the bigger picture.',
    ],
  },
  {
    name: 'Inna Fedorova',
    role: 'Developer',
    bio: 'Handled interface components and integrated API functionality for seamless data flow.',
    github: 'https://github.com/IFMA25',
    photo: '/photos/inna.jpg',
    contributions:
      'Set up the database API, and helped shape the aesthetic style of the project.',
    teamCollaboration:
      'Configured API integration, implemented stylish loaders and notification systems, and actively participated in regular code reviews and feedback cycles.',
    reviews: [
      'Alex: Inna was always precise and attentive to detail.',
      'Aleksey: Her API documentation saved the team a lot of time.',
      'Combines analytical thinking with creative input.',
    ],
  },
  {
    name: 'Alex Alion',
    role: 'Developer',
    bio: 'Handled layout implementation, design integration, and interface testing.',
    github: 'https://github.com/nevox-alexxx',
    photo: '/photos/alex.jpg',
    contributions:
      'Developed responsive layout, integrated designs, and performed extensive UI testing.',
    teamCollaboration:
      'Demonstrated meticulous attention to design consistency and user experience, contributed UI refinements, and covered major components with tests.',
    reviews: [
      'Inna: Alex always sticks to best practices and maintains high quality.',
      'Aleksey: His attention to detail and responsibility stand out.',
      'Always finds a way to improve the user experience.',
    ],
  },
]

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
          href="https://app.rs.school/"
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

const TeamMemberBlock = ({
  member,
  isActive,
  onClick,
}: TeamMemberBlockProps) => {
  const [reviewIndex, setReviewIndex] = useState(0)

  const handlePrev = () => {
    setReviewIndex((prev) =>
      prev === 0 ? member.reviews.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setReviewIndex((prev) =>
      prev === member.reviews.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div
      className={`${styles.block} ${isActive ? styles.active + ' ' + styles.hovered : ''}`}
      onClick={(e) => {
        if (isActive) {
          e.currentTarget.scrollTop = 0
        }
        onClick()
      }}
    >
      <div className={styles.card}>
        <img src={member.photo} alt={member.name} className={styles.photo} />
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.bio}>{member.bio}</p>
        <a
          href={member.github}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>
        <p className={styles.contribution}>
          <strong>Contributions:</strong> {member.contributions}
        </p>

        <p className={styles.tip}>↓ Click and Scroll ↓</p>
      </div>

      {isActive && (
        <div
          className={`${styles.extraContent} ${isActive ? styles.visible : ''}`}
        >
          <h4>Comments</h4>
          <div className={styles.carousel}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className={styles.arrow}
            >
              &lt;
            </button>
            <div className={styles.review}>
              <p>&quot;{member.reviews[reviewIndex]}&quot;</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className={styles.arrow}
            >
              &gt;
            </button>
          </div>
          <div className={styles.teamCollaboration}>
            <h4>Team Collaboration</h4>
            <p>{member.teamCollaboration}</p>
          </div>
        </div>
      )}
    </div>
  )
}
