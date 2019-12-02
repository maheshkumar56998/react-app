import React, {Component} from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import {Container} from 'reactstrap'

class InstructorApp extends Component{
    render (){
        return(<>
        <Container>
            <h2>Query Application</h2>
            <hr></hr>
            <ListCoursesComponent/>
        </Container>
            </>
        );
    }
}
export default InstructorApp;