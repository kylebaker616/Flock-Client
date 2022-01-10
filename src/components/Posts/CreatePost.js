/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createPost } from '../../api/posts.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createPostSuccess, createPostFailure } from '../AutoDismissAlert/messages'

class NewPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      price: '',
      language: ''
    }
  }

	handleChange = (event) =>
	  this.setState({
	    [event.target.name]: event.target.value
	  })

	onNewPost = (event) => {
	  const { msgAlert } = this.props
	  event.preventDefault()

	  const { user } = this.props

	  createPost(this.state, user)
	    .then((res) => console.log(res))
	    .then(() =>
	      msgAlert({
	        heading: 'Post created',
	        message: createPostSuccess,
	        variant: 'success'
	      })
	    )
	    // .then(() => history.push('/posts'))
	    .catch((error) => {
	      this.setState({ title: '', description: '', price: '' })
	      msgAlert({
	        heading: 'Post Failed with error: ' + error.message,
	        message: createPostFailure,
	        variant: 'danger'
	      })
	    })
	}

	render () {
	  const { title, description, price } = this.state
	  return (
	    <div className='row'>
	      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
	        <h3>Sign Up</h3>
	        <Form onSubmit={this.onNewPost}>
	          <Form.Group controlId='title'>
	            <Form.Label>Title</Form.Label>
	            <Form.Control
	              required
	              type='text'
	              name='title'
	              value={title}
	              placeholder='Item Name'
	              onChange={this.handleChange}
	            />
	          </Form.Group>
	          <Form.Group controlId='description'>
	            <Form.Label>Description</Form.Label>
	            <Form.Control
	              required
	              type='text'
	              name='description'
	              value={description}
	              placeholder='Description'
	              onChange={this.handleChange}
	            />
	          </Form.Group>
	          <Form.Group controlId='price'>
	            <Form.Label>price</Form.Label>
	            <Form.Control
	              required
	              name='price'
	              value={price}
	              type='price'
	              placeholder='price'
	              onChange={this.handleChange}
	            />
	          </Form.Group>
	          <Button variant='success' type='submit'>
							Post
	          </Button>
	        </Form>
	      </div>
	    </div>
	  )
	}
}
export default withRouter(NewPost)
