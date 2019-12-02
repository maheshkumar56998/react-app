import React, { Component } from 'react';
import QueryDataService from '../service/QueryDataService'
import { Container, Row, Col,Input } from 'reactstrap';
import { Modal, Button, Form } from 'react-bootstrap'
import { FaPlus,FaEdit,FaTrash } from "react-icons/fa";


class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            queries: [],
            message: null,
            showModal: false,
            queryObj: { id: '',question: 'abc', answer: 'xyz' }
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        QueryDataService.retriveAllQueries()
            .then(
                response => {
                    console.log(response);
                    this.setState({ queries: response.data })
                }
            )
    }




    render() {
        return (
            <div className="container">

                <Row>
                    <Col sm="10"><h3 className="text-center">All Queries and Answers</h3></Col>
                    <Col sm="2"><b><FaPlus onClick={() => { this.addQuery() }} title="Add query"/></b></Col>
                </Row>
                <Row />
                <Row />
                <div className="container">
                    <Container>

                        <b><Row>
                            <Col sm="1">Id</Col>
                            <Col sm="2">Question</Col>
                            <Col sm="8">Answer</Col>
                            <Col sm="1">Options</Col>
                        </Row></b>

                        {
                            this.state.queries.map(query => {
                                return (
                                    <Row key={query.id}>
                                        <Col sm="1">{query.id}</Col>
                                        <Col sm="2">{query.question}</Col>
                                        <Col sm="8">{query.answer}</Col>
                                        <Col sm="1">
                                            <FaEdit  title="Edit Query" onClick={() => { this.updateQuery(query) }}/>
                                           <FaTrash title="Delete Query" onClick={() => { this.deleteQuery(query) }}/>
                                        </Col>
                                    </Row>
                                )
                            })
                        }

                    </Container>
                </div>
                <Modal show={this.state.showModal} onHide={() => { this.hideModal() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Question and answer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="query.question">
                                <Form.Label>Question</Form.Label>
                                <Input type="textarea" bsSize="lg" as="textarea" name="question"  placeholder="Question" rows="2" value={this.state.queryObj.question} onChange = {this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="query.answer">
                                <Form.Label>Answer</Form.Label>
                                <Input type="textarea" bsSize="text" as="textarea" name="answer" placeholder="Answer" rows="4"  value={this.state.queryObj.answer}  onChange = {this.handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.updateQueryWithData}>
                            Update
                    </Button>
                        <Button variant="primary" onClick={this.addQueryWithData}>
                            Create
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    hideModal() {
        this.setState({
            showModal: false
        })
    }

    
    handleChange = (e) => {
        console.log('called',e.target.name)
        this.setState({
            ...this.state,
            queryObj : {
                ...this.state.queryObj,
                [e.target.name] : e.target.value
            }
        })
    }

    updateState(query) {
        const queries = this.state.queries.filter(que => que.id !== query.id);
        this.setState({ queries: queries });
    }

    addQuery = () => {
        console.log(this.state)
        console.log('adding new query');
        this.setState({
            showModal: true
        })

    }
    addQueryWithData = () => {
        console.log(this.state)
        console.log('adding new query');
        this.setState({
            showModal: false
        })

        QueryDataService.createQuery(this.state.queryObj)
        .then(response => {
            console.log('status code: '+response.status);
            console.log(response);
             if (response.status === 200) {
                 this.setState({
                     ...this.state,
                     queries : [response.data, ...this.state.queries]
                 })
                console.log("added your query sucessfully.... " )
                  
                // this.setState({ queries: queries });
             } else {
                 console.log("unable to add your query : " + response.data)
             }

        })
        .catch(error => {
            console.log(error);
        });

        
    }

    updateQuery(query) {
        
        console.log(query);
        this.setState({
            showModal: true,
            queryObj : {
               ...query
            }

        })
    }

    updateQueryWithData = () => {
        console.log(this.state)
        console.log('updating query');
        this.setState({
            showModal: false
        })

        QueryDataService.updateQuery(this.state.queryObj)
        .then(response => {
            console.log('updated query');
            console.log('status code: '+response.status);
            console.log(response);
             if (response.status === 200) {
                
                const queries = this.state.queries.filter(que => que.id !== this.state.queryObj.id);
                 this.setState({
                     ...this.state,
                     queries : [response.data, ...queries]
                 })
                console.log("Updated your query sucessfully.... " )
                  
             } else {
                 console.log("unable to update your query : " + response.data)
             }
        })
        .catch(error => {
            console.log(error);
        });      
    }

    deleteQuery(query) {
        console.log('deleted....');
        console.log(query.id);
        QueryDataService.deleteQuery(query.id)
            .then(response => {
                if (response.data === 'sucess') {
                    this.updateState(query);
                } else {
                    console.log("unable to delete : " + response.data)
                }

            })
            .catch(error => {
                console.log(error);
            });
    }

}
export default ListCoursesComponent;