import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {sendMessage} from "../actions/index";

class MessageForm extends Component {
	componentWillReceiveProps(nextProps) {	
		document.getElementById("textfield").value = nextProps.editMessage;
	}
	render(){
		return (
		    <div className="form-group">
				<textarea className="form-control" rows="3" onKeyDown={(e) => this.props.sendMessage(e, this.props.midEdit)} ref="form-control" id="textfield" ></textarea>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		midEdit: state.midEdit,
		editMessage: state.editMessage,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({sendMessage : sendMessage}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageForm);