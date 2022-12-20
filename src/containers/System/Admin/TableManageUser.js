import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let { userRedux } = this.state
        return (
            <>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {userRedux && userRedux.length > 0 && userRedux.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.firstName}
                                    </td>
                                    <td>
                                        {item.lastName}
                                    </td>
                                    <td>
                                        {item.address}
                                    </td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            type="button"
                                            onClick={() => this.handleEditUser(item)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            type="button"
                                            onClick={() => this.props.deleteUserRedux(item.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsers()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
