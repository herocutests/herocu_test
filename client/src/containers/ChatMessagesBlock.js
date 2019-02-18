import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {toggleStickers} from "../actions/index";
import Chat from "./Chat";
import Sticker from "./Sticker";

class ChatMessagesBlock extends Component {
	getStickers(){
	    let img = [];
		for(var i = 1; i <= 48; i++){ 
			img.push(<Sticker key={"sticker_"+i} i={i} sendSticker={this.props.sendSticker} />)
		}
		return img
	}
	render(){
		let transition = 'chatContainerTransition ';
		return (
			<div className="row">
				<div className={this.props.isStickersShown === false ? transition+'col-11' : transition+"col-8"}>
					<Chat />
				</div>
				<div className={this.props.isStickersShown === false ? transition+'col-1' : transition+"col-4"}>
					<div className="slideStickers" onClick={(e) => this.props.toggleStickers()} > </div>
					<div className='stickerModal'>
						{this.getStickers()}
				    </div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isStickersShown : state.isStickersShown
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({toggleStickers : toggleStickers}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatMessagesBlock);