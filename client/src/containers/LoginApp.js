import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {typeUsername} from "../actions/index";

class LoginApp extends Component {
	returnMark(){
		return(
		   	<div className="username">
		   		<h1>Введите имя</h1>
		   		<input type="text" id='nickname' onKeyUp={(e) => this.props.typeUsername(e)} />
		   		<p className='userWarning' >{this.props.errorLoginMessage}</p>
		   	</div>
		)
	}
	render(){
		return(
		    <div>
		    	{this.props.isUserLoggedIn === false ? this.returnMark() : ""}
		    </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isUserLoggedIn : state.isUserLoggedIn,
		errorLoginMessage : state.errorLoginMessage
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({typeUsername : typeUsername}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginApp);