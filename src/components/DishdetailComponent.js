import React ,{Component} from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Row, Col, Input, Label  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component{
        constructor(props){
            super(props)
            this.state={
                isModalOpen:false
            }
            this.toggleModal=this.toggleModal.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
              isModalOpen:!this.state.isModalOpen
            })
        }

        handleSubmit(values) {
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            this.toggleModal();
            // event.preventDefault();
        }
        render(){
            return (
                <div>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Control.select>
                                    
                                            
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
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
                                            required: 'Required',
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
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Comment
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>

            )
        }

    }

    function Rendercomments({comments, addComment, dishId}){

        if(comments == null)
          return (<div></div>)
        const comt = comments.map((comment) => {
        return (
            <div>
                <ul className='list-unstyled'>
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
            </ul>
            </div>
            )
       })
       return(
           <div>
               {comt}
               <CommentForm dishId={dishId} addComment={addComment}/>
           </div>
       )}

    function Renderdetails({dish}){
        if(dish != null){
            return(
                <Card>
                    {/* <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg> */}
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(dish == null)
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
                        <Rendercomments  comments={props.comments} 
                                        addComment={props.addComment} 
                                        dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );
    }
export default Dishdetail