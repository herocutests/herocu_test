import React, {Component} from "react";
import {connect} from "react-redux";
import helperFunctions from "../helper";

class UsersList extends Component {
	render(){
		return (
		    <div>
		    	<div id="users_count">В чате {this.props.usersCount} пользовате{helperFunctions.numericEnding(this.props.usersCount, 'ль', 'ля', 'лей')}.</div>
				<div className="userList">
				    {Object.keys(this.props.usersList).map(i => (
				    	(this.props.usersList[i]['inChat'] === false ) ? '' : 
						<p key={i} className={this.props.usersList[i]['online'] === true ? 'user_online' : 'user_gone'} >{this.props.usersList[i]['name']}</p>
					))}

				</div>
		    </div>
		)
	}
}

function mapStateToProps(state) {
	return {
		usersList: state.usersList, 
		usersCount: state.usersCount
	};
}

export default connect(mapStateToProps)(UsersList);
