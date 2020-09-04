import React from 'react';
import { Button, Table } from 'reactstrap';
import UpdateInterview from './updateInterview';
class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: [],
            showUpdate: false,
            updateID: 0
        }
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    componentDidMount() {
        this.getInterviews();
    }
    unsetUpdate = () => {
        this.setState({
            showUpdate: false,
            updateID: 0
        });
        this.getInterviews();
    }
    getInterviews = () => {
        // Get the passwords and store them in state
        fetch('/interviews')
            .then(res => res.json())
            .then(interviews => this.setState({ interviews }));
    }
    update = (e) => {
        console.log("Update: ", e);
        this.setState({
            showUpdate: true,
            updateID: e
        })
    }
    delete = (e) => {
        console.log("Delete: ", e);
        var url = '/interviews/' + e;
        console.log(url);
        fetch(url, {
            "method": "DELETE",
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.getInterviews();
            })
            .catch(err => {
                console.log(err);

            });
    }
    render() {
        const { interviews } = this.state;
        return (
            <div>
                {
                    this.state.updateID ?
                        <UpdateInterview interview={this.state.interviews[this.state.updateID - 1]} unsetUpdate = {this.unsetUpdate} />
                        : null
                }
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Interview ID</th>
                            <th>Interviewer Name</th>
                            <th>Interviewee Name</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>End Date</th>
                            <th>End Time</th>
                            <th>Edit Interview</th>
                            <th>Delete Interview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            interviews.map(interview =>
                                <tr key={interview.id}>
                                    <td>{interview.id}</td>
                                    <td>{interview.Interviewer}</td>
                                    <td>{interview.Interviewee}</td>
                                    <td>{interview.startDate}</td>
                                    <td>{interview.startTime}</td>
                                    <td>{interview.endDate}</td>
                                    <td>{interview.endTime}</td>
                                    <td><Button id={interview.id} name={interview.id} onClick={() => this.update(interview.id)} > Update </Button></td>
                                    <td><Button id={interview.id} name={interview.id} onClick={() => this.delete(interview.id)}> Delete </Button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

            </div>
        )
    }
}
export default Interviews;