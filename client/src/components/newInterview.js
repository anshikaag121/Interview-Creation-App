import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Container } from 'reactstrap';

class NewInterview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Interviewer: this.props.Interviewer || "",
            Interviewee: this.props.Interviewee || "",
            startDate: this.props.startDate || "",
            endDate: this.props.endDate || "",
            startTime: this.props.startTime || "",
            endTime: this.props.endTime || "",
            err: "",
        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(changeObject) {
        this.setState(changeObject, () => { console.log(this.state) });
    }
    // handleInterviewerID(event) {
    //     this.setState({ InterviewerID: event.target.value }, () => console.log("InterviewerID ", this.state.InterviewerID));

    // }
    create = () => {
        // add entity - POST
        fetch("/interviews", {
            "method": "POST",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                Interviewer: this.state.Interviewer,
                Interviewee: this.state.Interviewee,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.message)
                {
                    this.handleChange({ err: response.message });
                    this.handleChange({ message: null });
                }
                else{
                    this.handleChange({ err: null });
                    this.handleChange({ message: "Interview Succesfully Created" });
                }
                
            })
            .catch(err => {
                console.log(err);
                
            });
    }
    render() {
        return (
            <>
                <Container>
                    <div style={{ textAlign: "center", fontSize: 30 }}>New Interview</div>
                    <Form>
                        <FormGroup row>
                            <Label sm={2}>Interviewer </Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    name="Interviewer"
                                    id="Interviewer"
                                    placeholder="Interviewer"
                                    value={this.state.Interviewer}
                                    onChange={(event) => this.handleChange({ Interviewer: event.target.value })}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Interviewee </Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    name="Interviewee"
                                    id="Interviewee"
                                    placeholder="Interviewee"
                                    value={this.state.Interviewee}
                                    onChange={(event) => this.handleChange({ Interviewee: event.target.value })}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Start Date</Label>
                            <Col sm={10}>
                                <Input
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    placeholder="Start Date"
                                    value={this.state.startDate}
                                    onChange={(event) => this.handleChange({ startDate: event.target.value })}
                                    required
                                />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Start Time</Label>
                            <Col sm={10}>
                                <Input
                                    type="time"
                                    name="startTime"
                                    id="startTime"
                                    placeholder="Start Time"
                                    value={this.state.startTime}
                                    onChange={(e) => this.handleChange({ startTime: e.target.value })}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>End Date</Label>
                            <Col sm={10}>
                                <Input
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    placeholder="End Date"
                                    value={this.state.endDate}
                                    onChange={(e) => this.handleChange({ endDate: e.target.value })}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>End Time</Label>
                            <Col sm={10}>
                                <Input
                                    type="time"
                                    name="endTime"
                                    id="endTime"
                                    placeholder="End Time"
                                    value={this.state.endTime}
                                    onChange={(e) => this.handleChange({ endTime: e.target.value })}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Submit</Label>
                            <Col sm={10}>
                                <Button onClick={this.create}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
                <div style={{ textAlign: "center", color: "red" }}>{this.state.err}</div>
                <div style={{ textAlign: "center", color: "green" }}>{this.state.message}</div>

            </>
        )
    }
}
export default NewInterview;