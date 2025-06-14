import { useState } from 'react'
import styles from './AboutPage.module.scss'

type TeamMember = {
  name: string
  role: string
  bio: string
  github: string
  photo: string
  contributions: string
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
    bio: 'Handled layout implementation, design integration, and interface testing.',
    github: 'https://github.com/Alekseyinshakov',
    photo: '/photos/aleksey.jpg',
    contributions:
      'Provided project structure, handled architecture choices, and ensured code quality across the board.',
    reviews: [
      'Alex: Aleksey kept the team organized and always helped clarify complex issues.',
      'Inna: His support helped us focus on our individual tasks with confidence.',
      'A motivated and thoughtful leader who always sees the bigger picture.',
    ],
  },
  {
    name: 'Inna Fedorova',
    role: 'Developer',
    bio: 'Handled layout implementation, design integration, and interface testing.',
    github: 'https://github.com/IFMA25',
    photo: '/photos/inna.jpg',
    contributions:
      'Set up the database API, and helped shape the aesthetic style of the project.',
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
    reviews: [
      'Inna: Alex always sticks to best practices and maintains high quality.',
      'Aleksey: His attention to detail and responsibility stand out.',
      'Always finds a way to improve the user experience.',
    ],
  },
]

export const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className={`container ${styles.margin}`}>
      <h2 className={styles.title}>About Us</h2>
      <div className={styles.about}>
        {teamMembers.map((member, index) => (
          <TeamMemberBlock
            key={index}
            member={member}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
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
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
            vero modi asperiores debitis similique expedita harum omnis est
            accusantium iure molestiae facere sequi consectetur ipsa impedit
            aut, vel eligendi officiis porro eaque maiores sed obcaecati? Nulla
            aut qui quas at eaque, ipsum quod quisquam esse quo alias facere,
            dolores cumque?
          </p>
        </div>
      )}
    </div>
  )
}
