import React ,{Component} from 'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props){
        super(props)
    }
    rendercomments(comments){
        if(comments == null)
         return <div></div>
        const cmnts = comments.map((comment)=>{
            return(
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
        return (
            <div className="col-12 col-md-5 m-1">
                <h3>Comments</h3>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
            </div>
        )
    }

    renderdetails(dish){
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
               </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    render(){
        const dish=this.props.dish
        if(dish == null)
          return <div></div>
        const dishitems=this.renderdetails(dish)
        const dishcomments=this.rendercomments(dish.comments)
        return (
            <div class="container">
                <div className="row">
                  {dishitems}
                  {dishcomments}
                </div>
            </div>
        )
    }
}
export default Dishdetail