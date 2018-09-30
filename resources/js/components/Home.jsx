import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Axios from '../../../node_modules/axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:8000/api/employees')
            .then((res) => {
                this.setState({
                    users: res.data
                })
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <div className="jumbotron">Hello</div>
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/employees">Employees</Link>
                        </div>
                        <div className="col-md-8">
                            <Switch>
                                <Route path="/employees" render={(props) => {
                                    return <ShowEmployees {...props} users={this.state.users} />
                                }} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

class ShowEmployees extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.users.map((u) => {
            return (
                <li key={u.employee_id}>
                    <Link to={"/employees/" + u.employee_id}>{u.first_name}</Link>
                </li>
            )
        })
        return (
            <div>
                <h1>Employees List</h1>
                <Route path="/employees/:employeeId" component={(props) => {
                    return <EmployeeInfo {...props}/>
                }} />
                <ul>
                    {user}
                </ul>
            </div>
        )
    }
}

class EmployeeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:8000/api/employees/' + this.props.match.params.employeeId)
            .then((res) => {
                this.setState({
                    employee: res.data
                })
            }).catch((e) => {
                console.log(e);
            });
    }

    render() {
        let em = this.state.employee;
        return (
            <div>
                <h3>{em.first_name}</h3>
                <p>{em.email}</p>
                <p>{em.phone_number}</p>
            </div>
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Home />, document.getElementById('root'));
}
