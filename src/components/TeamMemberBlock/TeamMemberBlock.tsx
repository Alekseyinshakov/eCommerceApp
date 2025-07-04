import { useState } from 'react'
import type { TeamMemberBlockProps } from 'types'

import styles from './TeamMemberBlock.module.scss'

const {
  block,
  active,
  hovered,
  card,
  name,
  role,
  bio,
  link,
  photo,
  contribution,
  tip,
  extraContent,
  visible,
  carousel,
  arrow,
  review,
  teamCollaboration,
  title,
} = styles

export const TeamMemberBlock = ({
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
      className={`${block} ${isActive ? active + ' ' + hovered : ''}`}
      onClick={(e) => {
        if (isActive) {
          e.currentTarget.scrollTop = 0
        }
        onClick()
      }}
    >
      <div className={card}>
        <img src={member.photo} alt={member.name} className={photo} />
        <h3 className={name}>{member.name}</h3>
        <p className={role}>{member.role}</p>
        <p className={bio}>{member.bio}</p>
        <a
          href={member.github}
          className={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>
        <p className={contribution}>
          <strong>Contributions:</strong> {member.contributions}
        </p>

        <p className={tip}>↓ Click and Scroll ↓</p>
      </div>

      {isActive && (
        <div className={`${extraContent} ${isActive ? visible : ''}`}>
          <h4 className={title}>Comments</h4>
          <div className={carousel}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className={arrow}
            >
              &lt;
            </button>
            <div className={review}>
              <p>&quot;{member.reviews[reviewIndex]}&quot;</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className={arrow}
            >
              &gt;
            </button>
          </div>
          <div className={teamCollaboration}>
            <h4 className={title}>Team Collaboration</h4>
            <p>{member.teamCollaboration}</p>
          </div>
        </div>
      )}
    </div>
  )
}
