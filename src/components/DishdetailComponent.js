import React from 'react';
import { CardImg, Card, CardText, CardBody, CardTitle } from 'reactstrap';



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

    function RenderComments({comments}) {

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
        const dishComment = <RenderComments comments={props.dish.comments} />

        return (
          <div className="container">
            <div className='row'>
              <div className='col-12 col-md m-1'>
                {dishItem}
              </div>
              {dishComment}
            </div>
          </div>
        );
    }

export default DishDetail;