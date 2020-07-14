import React  from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function Rendercomments({comments}){
        if(comments == null)
          return (<div></div>)
        const comt = comments.map((comment) => {
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
               {comt}
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
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                       <Renderdetails dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        <ul className='list-unstyled'>
                            <Rendercomments comments={props.comments}/>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
export default Dishdetail