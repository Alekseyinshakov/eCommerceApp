import { useState } from 'react'
import styles from './AboutPage.module.scss'

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
    bio: 'Worked on building the API and contributed to the visual design of the project.',
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
  return (
    <div className={`container ${styles.margin}`}>
      <h2 className={styles.title}>About Us</h2>
      <div className={styles.about}>
        {teamMembers.map((member, index) => (
          <TeamMemberBlock key={index} member={member} />
        ))}
      </div>
    </div>
  )
}

const TeamMemberBlock = ({
  member,
}: {
  member: (typeof teamMembers)[number]
}) => {
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
    <div className={styles.block}>
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
      </div>

      <div className={styles.carousel}>
        <button onClick={handlePrev} className={styles.arrow}>
          &lt;
        </button>
        <div className={styles.review}>
          <p>&quot;{member.reviews[reviewIndex]}&quot;</p>
        </div>
        <button onClick={handleNext} className={styles.arrow}>
          &gt;
        </button>
      </div>
    </div>
  )
}
