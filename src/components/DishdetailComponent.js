import React  from 'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';

    function Rendercomments({dish}){
        if(dish == null)
          return (<div></div>)
        const comments = dish.comments.map((comment) => {
        return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            )
       })
       return(
           <ul className='list-unstyled'>
               {comments}
           </ul>
       )}

    function Renderdetails({dish}){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const Dishdetail=(props) => {
        const dish=props.dish
        if(dish == null)
          return <div></div>
        return (
            <div class="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                       <Renderdetails dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        <ul className='list-unstyled'>
                            <Rendercomments dish={props.dish}/>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
export default Dishdetail