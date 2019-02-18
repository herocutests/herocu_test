import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Sticker from "./Sticker";
import Linkify from 'linkifyjs/react';
import helperFunctions from "../helper";
import {editMessage} from "../actions/index";

class Chat extends Component {
	getSystemMessage(message, isDate = false){
		return (
		    <div className={isDate === true ? "newUser dateMessage" : 'newUser'}>{message}</div>
		)
	}

	getUsernameMessage(mid){
		let userMessageClass = "message_container "+this.getUnreadClassname(this.props.chatHistory[mid]["unread"]);
		return (
			<div 
				key={"message_2_"+mid} 
				className={userMessageClass}
			>
				<div 
					key={"message_2_1_"+mid} 
					className="date_name"
				>
					{helperFunctions.parseTime(this.props.chatHistory[mid]["date"])}
					<p 
						key={"message_2_1_3_"+mid}  
						className="user" 
						style={{'color' : this.props.usersList[this.props.chatHistory[mid]["user"]]["color"]}} 
					>
						{this.props.usersList[this.props.chatHistory[mid]["user"]]["name"]}
					</p>
				</div>
			</div>
		)
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom = () => {
		if(this.props.mid !== -1)
			return;
		var list = document.getElementById("chat");
		list.scrollTop = list.scrollHeight;
	}

	getMessageMessage(mid){
		let message = this.props.chatHistory[mid];
		let editting = (this.props.mid === mid ? 'editingMessage' : '');
		let messageClass = "message_container " + (message['isChanged'] === true ? 'editedMsg ' : '') +this.getUnreadClassname(message["unread"])+' '+editting;
		return (
			<div 
				key={"message_1_"+mid} 
				className={messageClass} 
				onClick={(e) => this.props.editMessage(this.props.mid === mid || this.props.uid !== message['user'] ? -1 : mid)} 
			>
				<Linkify 
					key={"message_1_2_"+mid} 
					tagName="p" 
					className="message" 
				>
					{message['msg']}
				</Linkify>
			</div>
		)
	}

	getUnreadClassname(read){
		return (read === true ? 'unreadMessages ' : '')
	}

	render(){
		let date = '';
		return(
			<div id="chat">
				{( this.props.chatHistory && Object.keys(this.props.usersList).length > 0) ? Object.keys(this.props.chatHistory).map(i => {
					let chat = this.props.chatHistory[i];

					let userChanged = false,
						dateChanged = false;

					if(date !== helperFunctions.parseDate(chat['date'])){
						date = helperFunctions.parseDate(chat['date']);
						dateChanged = true;
					}
					if(this.lastMessageUid !== chat['user']){
						this.lastMessageUid = chat['user'];
						userChanged = true;
					}

					return [
						(dateChanged === true) ? 
							this.getSystemMessage(date, true) : 
							'',
						(chat['isSystem'] === false && userChanged === true && chat['isSystem'] === false) ? 
							this.getUsernameMessage(i)
							: '',
						(chat['isSystem'] === true) ?
							this.getSystemMessage(chat['msg']) : 
							(chat['isSticker'] === false) ?
								this.getMessageMessage(i) :
								<div className={(chat['unread'] === true ? 'unreadMessages stickerMessage' : 'stickerMessage')}>
									<Sticker i={chat['msg']} key={'messageStacker_'+chat["msg"]} canSend={false} />
								</div>
					]
					
				}) : ''}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		chatHistory : state.messagesList,
		usersList : state.usersList,
		uid : state.uid,
		mid : state.midEdit,
		lastRead : state.lastRead
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({editMessage : editMessage}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Chat);