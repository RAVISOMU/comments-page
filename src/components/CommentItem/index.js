import './index.css'

const CommentItem = props => {
  const {eachComment, toggleLikeImage, onDeleteComment} = props
  const {name, comment, isLiked, className, time, id} = eachComment
  const initial = name.charAt(0).toUpperCase()

  const onClickLikeButton = () => {
    toggleLikeImage(id)
  }

  const onClickDeleteButton = () => {
    onDeleteComment(id)
  }

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLiked ? 'Liked' : 'Like'
  const likeClass = isLiked ? 'liked-text' : 'like-text'

  return (
    <li className="comment-item">
      <div className="details-container">
        <p className={`${className} initial-container`}>{initial}</p>
        <h1 className="name">{name}</h1>
        <p className="time">{time}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="footer">
        <div>
          <button
            className="like-button"
            type="button"
            onClick={onClickLikeButton}
          >
            <img src={likeImage} alt="like" className="like-image" />
            <p className={likeClass}>{likeText}</p>
          </button>
        </div>
        <button
          type="button"
          data-testid="delete"
          className="delete-button"
          onClick={onClickDeleteButton}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
