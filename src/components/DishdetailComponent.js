import React, { Component } from 'react';
import { CardImg, Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
//import CommentForm from './CommentFormComponent';
import { Button, Modal, ModalBody, ModalHeader, Label, Row, Col } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);

    }

    handleCommentFormSubmit(values) {
        //this.toggleCommentFormModal();
        //console.log("Current State is: " + JSON.stringify(values));
        //alert("Current State is: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }


    render() {
        return (
            <React.Fragment>

                <Button outline onClick={this.toggleCommentFormModal}>
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                    <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                      className="form-control"
                                      name="rating"
                                      id="rating"
                                      >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required!',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


    function RenderDish({dish}) {
      if (dish != null) {
        return(
          <Card>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        );  
      }
      else {
        return(
          <div></div>
        );
      }
    }

    function RenderComments({comments, addComment, dishId}) {

      if (comments != null) {
        let list = comments.map((comment) => {
          return(
            <li key={comment.id}>
            <div>
              <p>{comment.comment}</p>
              <p>--{comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}</p>
            </div>
          </li>
          )
        });
        return(
          <div className='col-12 col-md m-1'>
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {list}
            </ul>
            <CommentForm 
              comments={comments}
              dishId={dishId}
              addComment={addComment} />
          </div>
        );
      }
      else {
        return(
          <div></div>
        );
      }
    }

    const DishDetail = (props) => {

        const dish = props.dish
        console.log("Menu Component render invoked")
        if (dish == null) {
          return (<div></div>);
        }

        const dishItem =  <RenderDish dish = {props.dish} />
        const dishComment = <RenderComments
        dish={props.dish} 
        comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
         />

        return (
          <div className="container">
            <div className='row'>
              <Breadcrumb>
                <BreadcrumbItem><Link to="/menu"> Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className='col-12'>
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md m-1'>
                {dishItem}
              </div>
              <div className='col-12 col-md m-1'>
                {dishComment}
              </div>
            </div>
          </div>
        );
    }

export default DishDetail;