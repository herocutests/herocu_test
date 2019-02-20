import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {toggleStickers} from "../actions/index";
import Chat from "./Chat";
import Sticker from "./Sticker";

class ChatMessagesBlock extends Component {
	stickerPacks = {
		1 : {
			'title' : "Kitty",
			'url' : 'https://s.tcdn.co/b9b/62e/b9b62ef1-afaf-3edf-b64c-ddce090ef749/',
			'count' : 48
		},
		2 : {
			'title' : "Porn Actress",
			'url' : 'https://s.tcdn.co/7c1/9d4/7c19d4f0-978b-3c2f-ac5c-e2a4297d108d/',
			'count' : 25
		},
		3 : {
			'title' : "Stay fit",
			'url' : 'https://s.tcdn.co/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/',
			'count' : 30
		}
	}

	getStickers(){
	    let img = [];
		Object.keys(this.stickerPacks).forEach (i => {
			img.push(<p className="ctickerTitle" key={"stickerTitle_"+i} >{this.stickerPacks[i]['title']}</p>);
			for(var k = 1; k <= this.stickerPacks[i]['count']; k++){ 
				img.push(<Sticker key={"sticker_"+i+'_'+k} i={this.stickerPacks[i]['url']+k} sendSticker={this.props.sendSticker} />);
			}
		})
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