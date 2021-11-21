import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>To Do</th>
                        <th>Location</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cetak}
                </tbody>
            </table>
        );
    }
}

export default Table;