import React from 'react';
import Table from './Table';
import axios from "axios"

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            todo: "",
            location: "",
            note: "",
            status: "",
            selectedIdx: null,
            todoList: [

                // id: 1,
                // date: "20/11/2021",
                // todo: "Intro ReactJS",
                // location: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                // note: "Prepare VSCode, Node js and CRA",
                // status: "Done"

            ]
        }
    }
    // btnSubmit = () => {
    //     let toDoList = this.state.todoList
    //     toDoList.push({
    //     date:this.refs.date.value,
    //     todo:this.refs.todo.value,
    //     location:this.refs.location.value,
    //     note:this.refs.note.value,
    //     status:"Done"
    //     })
    //     this.setState({toDoList})       
    // }

    // btnSubmit = () => {
    //     let temporary =[...this.state.todoList]
    //     temporary.push({
    //         id:temporary[temporary.length-1].id+1
    //         id:temporary.length+1,
    //         date:this.state.date,
    //         todo:this.state.todo,
    //         location:this.state.location,
    //         note:this.state.note,
    //         status:"Ongoing"
    //     })
    //     this.setState({todoList:temporary})

    // }

    // btnSubmit = () => {
    //     let { date, todo, location, note, todoList } = this.state
    //     let temporary = [...todoList]
    //     temporary.push({
    //         // id:temporary[temporary.length-1].id+1
    //         id: temporary.length + 1,
    //         date,
    //         todo,
    //         location,
    //         note,
    //         status: "Ongoing"
    //     })
    //     this.setState({ todoList: temporary })

    // }
    btnSubmit = () => {
        let { date, todo, location, note } = this.state // Destructure
        // axios
        axios.post("http://localhost:2000/todoList", {
            date, todo, location, note, status: "on going"
        }).then((response) => {
            // memanggil data terbaru untuk memperbarui data pada state
            this.getData()
        }).catch((err) => {

        })
    }
    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    }

    btnDelete = (idx) => {
        let temporary = [...this.state.todoList]
        temporary.splice(idx, 1)
        this.setState({ todoList: temporary })
    }

    btnEdit = (idx) => {
        this.setState({ selectedIdx: idx })
    }
    // 3. urutan ke 3
    // menjalankan sebuah fubgsi, pertama kali saat component atau page react js di render
    componentDidMount() {
        // fungsi yang digunakan untuk melakukan request data pertama ke backend
        this.getData()
    }
    getData = () => {
        // Axios : melakukan request data ke back-end atau API
        axios.get("http://localhost:2000/todoList")
            .then((response) => {
                // Masuk kedalam then ketika berhasil mendapat response dari json-server
                console.log(response.data)
                // menyimpan data respon kedalam state
                this.setState({ todoList: response.data })
            })
            .catch((err) => {
                // Masuk kedalam catch ketika gagal mendapat response dari json-server
                console.log(err)
            })
    }


    // printData = () => {
    //     return this.state.todoList.map((value, index) => {
    //         return (
    //             <tr>
    //                 <td>{index + 1}</td>
    //                 <td>{value.date}</td>
    //                 <td>{value.todo}</td>
    //                 <td><img src={value.location} width="50%"/></td>
    //                 <td>{value.note}</td>
    //                 <td>{value.status}</td>
    //                 <td>
    //                     <button type="button" className="btn btn-danger" onClick={()=>this.btnDelete(index)}>Delete</button>
    //                     <button type="button" className="btn btn-warning">Edit</button>
    //                 </td>
    //             </tr>
    //         )
    //     })
    // }

    //2. urutan ke 2
    printData = () => {
        return this.state.todoList.map((value, index) => {
            if (this.state.selectedIdx == index) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><input type="date" value={value.date} /></td>
                        <td><input type="text" value={value.todo} /></td>
                        <td><input type="text" value={value.location} /></td>
                        <td><input type="text" value={value.note} /></td>
                        <td><input type="text" value={value.status} /></td>
                        <td>
                            <button type="button" className="btn btn-success" onClick={() => this.setState({ index })}>Save</button>
                            <button type="button" className="btn btn-warning" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button>
                        </td>
                    </tr>
                )
            } else {

                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{value.date}</td>
                        <td>{value.todo}</td>
                        <td><img src={value.location} width="50%" /></td>
                        <td>{value.note}</td>
                        <td>{value.status}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => this.btnDelete(index)}>Delete</button>
                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#staticBackdrop2">
                                Edit
                            </button>
                            {/* <button type="button" className="btn btn-warning" onClick={() => this.btnEdit(index)}>Edit</button> */}
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Add
                </button>


                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add new data</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-2">

                                    <label for="date">Date</label>
                                    <input type="date" id="date" ref="date" onChange={(event) => this.handleInput(event.target.value, "date")} />

                                    <label for="to-do">To do</label>
                                    <input type="text" id="todo" ref="todo" onChange={(event) => this.handleInput(event.target.value, "todo")} />

                                    <label for="location">Location</label>
                                    <input type="text" id="location" ref="location" onChange={(event) => this.handleInput(event.target.value, "location")} />

                                    <label for="note">Note</label>
                                    <textarea type="text" id="note" ref="note" onChange={(event) => this.handleInput(event.target.value, "note")}></textarea>

                                </div>
                                {/* <button className="btn btn-primary" onClick={this.btnSubmit}>Submit</button> */}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.btnSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Edit your data!</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    
                                        
                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row"> */}
                {/* <div className="col-md-2">
                        <label for="date">Date</label>
                        <input type="date" id="date" ref="date" onChange={(event) => this.handleInput(event.target.value, "date")} />

                        <label for="to-do">To do</label>
                        <input type="text" id="todo" ref="todo" onChange={(event) => this.handleInput(event.target.value, "todo")} />

                        <label for="location">Location</label>
                        <input type="text" id="location" ref="location" onChange={(event) => this.handleInput(event.target.value, "location")} />

                        <label for="note">Note</label>
                        <textarea type="text" id="note" ref="note" onChange={(event) => this.handleInput(event.target.value, "note")}></textarea>

                        <button className="btn btn-primary" onClick={this.btnSubmit}>Submit</button>
                    </div> */}
                <div className="col-md-12">
                    <Table cetak={this.printData()} />
                </div>
                {/* </div> */}
            </div>
        );
    }
}
export default Input;
// render() {
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-2">
//                     <label for="date">Date</label>
//                     <input type="date" id="date" ref="date" onChange={(event) => this.handleInput(event.target.value, "date")} />

//                     <label for="to-do">To do</label>
//                     <input type="text" id="todo" ref="todo" onChange={(event) => this.handleInput(event.target.value, "todo")} />

//                     <label for="location">Location</label>
//                     <input type="text" id="location" ref="location" onChange={(event) => this.handleInput(event.target.value, "location")} />

//                     <label for="note">Note</label>
//                     <textarea type="text" id="note" ref="note" onChange={(event) => this.handleInput(event.target.value, "note")}></textarea>

//                     <button className="btn btn-primary" onClick={this.btnSubmit}>Submit</button>
//                 </div>
//                 <div className="col-md-10">
//                     <Table cetak={this.printData()} />
//                 </div>
//             </div>
//         </div>
//     );
// }
// }
