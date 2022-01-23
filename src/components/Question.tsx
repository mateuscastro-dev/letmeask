import classnames from 'classnames'

import '../styles/question.scss'

type QuestionProps = {
  children?: React.ReactNode
  content: string
  author: {
    name: string
    avatar: string
  }
  isAnswered?: boolean
  isHighlighted?: boolean
}

export function Question({
  children,
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div
      className={classnames(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}
    >
      <p>{content}</p>

      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div className='buttons-group'>{children}</div>
      </footer>
    </div>
  )
}
