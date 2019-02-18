import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {sendSticker} from "../actions/index";
import {connect} from "react-redux";
const stickerPath = "https://s.tcdn.co/b9b/62e/b9b62ef1-afaf-3edf-b64c-ddce090ef749/";

class Sticker extends Component {
	sendSticker(i){
		if(this.props.canSend === false)
			return;
		this.props.sendSticker(i);
	}

	render(){
		return (<img key={this.props.i+'_sticker'} alt="" src={stickerPath+this.props.i+".png"} className="sticker" onClick={() => this.sendSticker(this.props.i)} /> )
	}
}

function mapStateToProps(state) {
	return {
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({sendSticker : sendSticker}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Sticker);
