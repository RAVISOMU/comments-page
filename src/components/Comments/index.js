import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    name: '',
    comment: '',
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment, commentsList} = this.state
    const backgroundClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      className: backgroundClassName,
      time: formatDistanceToNow(new Date()),
    }

    const updatedComments = [...commentsList, newComment]

    this.setState({
      commentsList: updatedComments,
      name: '',
      comment: '',
    })
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredList})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  toggleLikeImage = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state
    return (
      <div className="comments-app-bg-container">
        <h1 className="comments-heading">Comments</h1>
        <div className="comment-app-header">
          <div className="comments-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <div className="form-container">
            <p className="comments-description">
              Say something about 4.0 Technologies
            </p>
            <form className="form-input" onSubmit={this.onAddComment}>
              <input
                onChange={this.onChangeName}
                placeholder="Your Name"
                type="text"
                className="text-input"
                value={name}
              />
              <textarea
                onChange={this.onChangeComment}
                className="text-area"
                placeholder="Your Comment"
                value={comment}
              />
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
          </div>
        </div>
        <p>
          <span>{commentsList.length}</span>
          Comments
        </p>
        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              eachComment={eachComment}
              toggleLikeImage={this.toggleLikeImage}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
