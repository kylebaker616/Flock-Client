import React, { Component } from 'react'
import { getPosts } from '../../api/posts'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
// import { render } from '@testing-library/react'
// import Checkout from '../stripe/Checkout'

class viewPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    getPosts(user)
      .then((res) => {
        this.setState({
          posts: res.data.posts
        })
      })
      .catch(console.error)
  }

  render () {
    const cardContainerLayout = {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap'
    }
    const { posts } = this.state
    let postsJsx
    if (posts.length === 0) {
      postsJsx = 'Whoops, looks like theres nothing to buy!'
    } else {
      postsJsx = posts.map((post) => (
        <Card key={post.id} style={{ width: '18rem', marginTop: '40px' }}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>${post.price}</Card.Text>
            <Button
              variant='danger'
              data-id={post._id}
              onClick={this.handleClick}>Add to cart
            </Button>
          </Card.Body>
        </Card>
      ))
    }

    return (
      <div>
        <div>
          <div style={cardContainerLayout}>{postsJsx}</div>
          {/* <Checkout
            msgAlert={this.props.msgAlert}
            history={this.props.history}
            user={this.props.user}
            cart={this.state.carts}
            name={'Enter payment information'}
            description={'Thank you for shopping with us!'}
            amount={sum}
          /> */}
        </div>
      </div>
    )
  }
}
export default withRouter(viewPosts)
