import React, {Component} from "react";
import {connect} from "react-redux";

class UserTyping extends Component {
	render(){
		return (<p id='usersTyping'>{this.props.text}</p> )
	}
}

function mapStateToProps(state) {
	return {
		text: state.usersTyping
	};
}

export default connect(mapStateToProps)(UserTyping);
