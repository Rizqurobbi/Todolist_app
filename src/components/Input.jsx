import React from 'react';
import Table from './Table';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [{

                id: 1,
                date: "20/11/2021",
                todo: "Intro ReactJS",
                location: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                note: "Prepare VSCode, Node js and CRA",
                status: "Done"

            }]
        }
    }
    btnSubmit = () => {
        let toDoList = this.state.todoList
        toDoList.push({
        date:this.refs.date.value,
        todo:this.refs.todo.value,
        location:this.refs.location.value,
        note:this.refs.note.value,
        status:"Done"
        })
        this.setState({toDoList})       
    }
    
    
    printData = () => {
        return this.state.todoList.map((value, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{value.date}</td>
                    <td>{value.todo}</td>
                    <td><img src={value.location} width="50%"/></td>
                    <td>{value.note}</td>
                    <td>{value.status}</td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <label for="date">Date</label>
                        <input type="date" id="date" ref="date"/>
                        
                        <label for="to-do">To do</label>
                        <input type="text" id="todo" ref="todo"/>
                        
                        <label for="location">Location</label>
                        <input type="text" id="location" ref="location"/>
                        
                        <label for="note">Note</label>
                        <textarea type="text" id="note" ref="note"></textarea>
                        
                        <button className="btn btn-primary" onClick={this.btnSubmit}>Submit</button>
                    </div>
                        <div className="col-md-10">
                            <Table cetak={this.printData()} />
                        </div>
                </div>
            </div>
        );
    }
}

export default Input;