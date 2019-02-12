import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './reset.css';
import io from 'socket.io-client';
import Linkify from 'linkifyjs/react';

const stickerPath = "https://s.tcdn.co/b9b/62e/b9b62ef1-afaf-3edf-b64c-ddce090ef749/"; 
const appSection = document.getElementById('chatApp')
const socket = io.connect(window.location.hostname, {secure: true});
//window.location.hostname

const helperFunctions = {
	isEnterButton : (e) => {
		return (e.keyCode === 13) ? true : false;
	},
	isEnterCtrlButton : (e) => {
		return ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) ? true : false;
	},
	isEmptyValue : (val) => {
		return (val === '') ? true : false
	},
	numericEnding : (number, one, two, five) => {
	    let n = Math.abs(number);
	    n %= 100;
	    if (n >= 5 && n <= 20) {
	    	return five;
	    }
	    n %= 10;
	    if (n === 1) {
	    	return one;
	    }
	    if (n >= 2 && n <= 4) {
	    	return two;
	    }
	    return five;
	},
	parseTime : (date) => {
		var time = new Date(date);
		return ("0" + time.getHours()).slice(-2)   + ":" +  ("0" + time.getMinutes()).slice(-2) + ":" ;
	},
	parseDate : (date) => {
		var messageDate = new Date(date);
		var searchDate = new Date();
		if(helperFunctions.compareDates(messageDate, searchDate))
			return "Сегодня";
		searchDate.setDate(searchDate.getDate()-1);
		if(helperFunctions.compareDates(messageDate, searchDate))
			return "Вчера";
		return messageDate.getDate()+'.'+messageDate.getMonth()+'.'+messageDate.getFullYear();
	},
	compareDates : (date1, date2) => {
		return (date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear() &&  date1.getDate() === date2.getDate()) ? true : false;
	}
};

class LoginWindow extends React.Component {   
	render() { 
		return (
		   	<div className="username">
		   	<h1>Введите имя</h1>
		   	<input type="text" id='nickname' onKeyUp={(e) => this.props.checkEnterKey(e)} />
		   	<p className='userWarning' >{this.props.error}</p>
		   	</div>
		);
	} 
}

class LoginApp extends React.Component {
	state = {
		error : ''
	}
	
	checkEnterKey = (e, val) => {
		var value = e.target.value.replace(/ /g, "");
		if(helperFunctions.isEmptyValue(value)){
			this.incorrectLogin();
			return;
		}
		this.clearError();
		if(!helperFunctions.isEnterButton(e))
			return;
		this.sendLogin(value);
	}

	sendLogin = (val) => {
		socket.emit('userName', {'user': val});
	}

	existLogin = () => {
		this.setErrorStateFun('Такой пользователь уже есть');
	}

	incorrectLogin = () => {
		this.setErrorStateFun('Недопустимое имя');
	}

	clearError = () => {
		this.setErrorStateFun('');
	}

	setErrorStateFun = (val) => {
		this.setState({
			error : val
		})
	}

	render() {
		return <LoginWindow error={this.state.error} checkEnterKey={this.checkEnterKey} />;
	}

	componentWillMount() {
        socket.on('existUsername', () => {
            this.existLogin();
        });
        socket.on('incorrectUsername', () => {
            this.incorrectLogin();
        });
    }
}

class ChatContainer extends React.Component { 
	state = {
		usersList : {},
		uid : 0,
		midEdit : -1,
		showStickers : false,
		message : ''
	}

	setEditMessage (mid, message){
		this.setState({
			midEdit : mid,
			message : message
		});
	}

	setUsers (users) {
		this.setState({
			usersList : users
		});
	}

	setUid (uid) {
		this.setState({
			uid : uid
		});
	}

	messageEdited = (mid = -1, message = '') => {
		this.setEditMessage(mid, message);
	}

	toggleStickers = (e) => {
		console.log(this.state.showStickers);
		this.setState({
			showStickers : (this.state.showStickers === false ? true : false)
		});
	}

	render() { 
		let transition = 'chatContainerTransition ';
		return (
		<section id='chatSection' className="container">
			<div className="row">
				<div className={this.state.showStickers === false ? transition+'col-11' : transition+"col-8"}>
					<Chat uid={this.state.uid} usersList={this.state.usersList} editMessage={this.messageEdited} edditingMessage={this.state.midEdit} />
				</div>
				<div className={this.state.showStickers === false ? transition+'col-1' : transition+"col-4"}>
					<div className="slideStickers" onClick={(e) => this.toggleStickers(e)} > </div>
					<Stickers />
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<UserTyping uid={this.state.uid} usersList={this.state.usersList}/>
					<MessageForm editMessage={this.state.message} midEdit={this.state.midEdit} messageEdited={this.messageEdited} />
					<UsersInfo usersList={this.state.usersList} />
				</div>
			</div>
		</section>
		);
	} 

	componentWillMount() {
		socket.on('chatHistory', (data) => {
			this.setUsers(data.userList);
		});
		socket.on('userLoggedIn', (data) => {
			this.setUid(data.uid);
		});
		socket.on('toggleOnline', (data) => {
			this.setUsers(data.usersList);
		});
		socket.on('chatNewUser', (data) => {
			var users = this.state.usersList;
			users[data.uid] = data.user;
			this.setUsers(users);
		});
    }

}

class Chat extends React.Component { 
	state = {
		chatHistory : {},
	}

	lastReadMessage = 0; 

	setHistory (history) {
		this.setState({
			chatHistory : history
		});
	}

	scrollToBottom = () => {
		var list = document.getElementById("chat");
		list.scrollTop = list.scrollHeight;
	}

	editMessage = (mid) => {
		if(mid === '' || mid === this.props.edditingMessage){
			this.props.editMessage(-1, '');
			return;
		}
		this.props.editMessage(mid, this.state.chatHistory[mid]['msg']);
	}

	render() { 
		let date = '';
		return (
		    <div id="chat">
				{Object.keys(this.state.chatHistory).map(i => {
					let userChanged = false,
						dateChanged = false;

					if(date !== helperFunctions.parseDate(this.state.chatHistory[i]['date'])){
						date = helperFunctions.parseDate(this.state.chatHistory[i]['date']);
						dateChanged = true;
					}
					if(this.lastMessageUid !== this.state.chatHistory[i]['user']){
						this.lastMessageUid = this.state.chatHistory[i]['user'];
						userChanged = true;
					}

					return [
						(dateChanged === true) ? <SystemMessage message={date} isDate={true} />  : '',
						(this.state.chatHistory[i]['isSystem'] === false && userChanged === true) ? 
							<UsernameItem userName={this.props.usersList[this.lastMessageUid]['name']}  userColor={this.props.usersList[this.lastMessageUid]['color']} date={this.state.chatHistory[i]['date']} unread={this.state.chatHistory[i]['unread']} />: '',
						(this.state.chatHistory[i]['isSystem'] === true) ?
							<SystemMessage message={this.state.chatHistory[i]['msg']} isDate="false" /> : 
							(this.state.chatHistory[i]['isSticker'] === false) ?
								<MessageItem message={this.state.chatHistory[i]} uid={this.props.uid} editMessage={this.editMessage} mid={i} isEdditing={this.props.edditingMessage === i ? true : false} /> :
								<div className={(this.state.chatHistory[i]['unread'] === true ? 'unreadMessages stickerMessage' : 'stickerMessage')}><SingleSticker i={this.state.chatHistory[i]['msg']} /></div>
					]
					
				})}
			</div>
		);
	} 

	componentWillMount() {
		socket.on('chatHistory', (data) => {
			this.setHistory(data.chat);
		});
		socket.on('rewriteMessage', (data) => {
			var changeMessage = this.state.chatHistory;
			changeMessage[data.mid] = data.message;
			this.setHistory(changeMessage);
		});
		socket.on('addMessage', (data) => {
			var newMessage = this.state.chatHistory;
			newMessage[data.id] = data.message;
			this.setHistory(newMessage);
		});
		socket.on('readAll', (data) => {
			var messages = this.state.chatHistory;
			for(let i = this.lastReadMessage; i<= data.toMessage; i++){
				messages[i]['unread'] = false;
			}
			this.setHistory(messages);
			this.lastReadMessage = data.toMessage;
		});
    }

    componentDidUpdate() {
		this.scrollToBottom();
	}
}

class SystemMessage extends React.Component {
	render() { 
		return (
		    <div className={this.props.isDate === true ? "newUser dateMessage" : 'newUser'}>{this.props.message}</div>
		)
	}
}

class Stickers extends React.Component {
	render() { 
		var img = [];
		for(var i = 1; i <= 48; i++){ 
			img.push(<SingleSticker click={this.sendSticker} i={i} />)
		}
		return (
			<div className='stickerModal'>
				{img}
	        </div>
		)
	}

	sendSticker = (i) => {
		socket.emit('addSticker', {'message': i.toString()});
	}
}

class SingleSticker extends React.Component {
	render() { 
		return (
		    <img key={this.props.i+'_sticker'} src={stickerPath+this.props.i+".png"} className="sticker" onClick={() => this.props.click(this.props.i)} />
		)
	}
}

class UsernameItem extends React.Component {
	render() { 
		let unread = (this.props.unread === true ? 'unreadMessages ' : '');
		let userMessageClass = "message_container "+unread;
		return (
			<div className={userMessageClass}>
				<div className="date_name">{helperFunctions.parseTime(this.props.date)}
					<p className="user" style={{'color' : this.props.userColor}} >{this.props.userName}</p>
				</div>
			</div>
		)
	}
}

class MessageItem extends React.Component {
	render() { 
		let unread = (this.props.message['unread'] === true ? 'unreadMessages ' : '');
		let editting = (this.props.isEdditing === true ? 'editingMessage' : '');
		let messageClass = "message_container " + (this.props.message['isChanged'] === true ? 'editedMsg ' : '') + unread + ' ' + editting +' '+ (this.props.uid === this.props.message['user'] ? 'pointer' : '');
		return (
			<div className={messageClass}>
			<Linkify tagName="p" className="message" onClick={() => this.props.editMessage(this.props.uid === this.props.message['user'] ? this.props.mid : '')}>{this.props.message['msg']}</Linkify>
			</div>
		)
	}
}

class UsersInfo extends React.Component { 
	state = {
		count : 0,
	}

	render() { 
		return (
		    <div>
		    	<div id="users_count">В чате {this.state.count} пользовате{helperFunctions.numericEnding(this.state.count, 'ль', 'ля', 'лей')}.</div>
				<div className="userList">
				    {Object.keys(this.props.usersList).map(i => (
				    	(this.props.usersList[i]['inChat'] === false ) ? '' : 
						<p key={i} className={this.props.usersList[i]['online'] === true ? 'user_online' : 'user_gone'} >{this.props.usersList[i]['name']}</p>
					))}

				</div>
		    </div>
		);
	} 

	setCount (count) {
		this.setState({
			count : count
		});
	}

	componentWillMount() {
		socket.on('chatHistory', (data) => {
			this.setCount(data.users);
		});
		socket.on('usersCount', (data) => {
			this.setCount(data);
		});
    }
}

class UserTyping extends React.Component { 
	state = {
		text : '',
	}

	render() { 
		return (
		    <p id='usersTyping'>{this.state.text}</p>
		);
	} 

	componentWillMount() {
		socket.on( 'usersTyping', (data) => {
			let users = '';
			var index = data.users.indexOf(this.props.uid);
			if (index != -1) data.users.splice(index, 1);
			for(var i = 0; i < data.users.length; i++){
				users += this.props.usersList[data.users[i]]['name']+(i === data.users.length - 1 ? ' печата'+(data.users.length > 1 ? 'ют' : 'ет')+' сообщение:' : ', ');
			}
			this.setState({
				text : users
			});
		})
    }
}

class MessageForm extends React.Component { 
	isTyping = false;
	intervalStopTyping = '';
	state = {
		message : ''
	}

	handleChange(event) {
		this.setState({message: event.target.value})
	}

	componentWillReceiveProps(nextProps) {	
		this.setState({message: nextProps.editMessage})
	}

	render() { 
		return (
		    <div className="form-group">
				<textarea className="form-control" rows="3" value={this.state.message} onKeyDown={(e) => this.keyPress(e)} ref="form-control" onChange={(event) => this.handleChange(event)} />
			</div>
		);
	} 

	keyPress = (e) => {
		if(helperFunctions.isEnterCtrlButton(e)){
			e.target.value += '\r\n';
			return;
		}
		if(helperFunctions.isEnterButton(e)){
			e.preventDefault();
			socket.emit('addMessage', {'message': e.target.value, mid : this.props.midEdit});
			this.setState({message: ''})
			this.props.messageEdited(-1, '');
			return;
		}
		clearTimeout(this.intervalStopTyping);
		this.intervalStopTyping = setTimeout(this.stopTyping, 1000);
		if(this.isTyping === true)
			return;
		socket.emit('userTyping');
		this.isTyping = true;
	}

	stopTyping = () => {
		socket.emit('userStopTyping');
		this.isTyping = false;
	}

}

class Audio extends React.Component {   
	render() { 
		return (
		   	<audio id="chatAudio">
			   	<source src={process.env.PUBLIC_URL+"/notify.ogg"} type="audio/ogg" />
			   	<source src={process.env.PUBLIC_URL+"/notify.mp3"} type="audio/mpeg" />
			   	<source src={process.env.PUBLIC_URL+"/notify.wav"} type="audio/wav" />
		   	</audio>
		);
	} 
}


class App extends React.Component {
	state = {
		isUserSiggedIn : false,
		isWindowOnFocus : true,
		uid : -1
	}

	render() {
		return (
		        <div>
		        	<ChatContainer uid={this.state.uid} />
		        	{(this.state.isUserSiggedIn === false) ? <LoginApp /> : ''}
		        	<Audio />
		        </div>
		        );
	}

	setUserStatus = (val) => {
		this.setState({
			isUserSiggedIn : val
		});
	}

	setWindowFocus = (val) => {
		this.setState({
			isWindowOnFocus : val
		});
	}

	readAll = () => {
		if(this.state.isUserSiggedIn === true && this.state.isWindowOnFocus === true)
			socket.emit('readAll');
	}

	componentWillMount() {
		socket.on('loginUser', (data) => {
			this.setUserStatus(false);
		});
		socket.on('addMessage', (data) => {
			this.readAll();
			if(this.state.isUserSiggedIn === true && this.state.isWindowOnFocus === false && data.message.isSystem === false){
				document.getElementById('chatAudio').play();
				document.title = "New messages";
			}
		});
		socket.on('userLoggedIn', (data) => {
			this.setUserStatus(true);
		});
		socket.on('returnUsername', (data) => {
			this.setUserStatus(true);
			this.setUid(data.uid);
		});
		socket.on('disconnect', () => {
			this.setUserStatus(false);
		});
		window.addEventListener("focus", (event) => {
			this.setWindowFocus(true);
			document.title = "Chat";
			socket.emit('toggleOnline');
			this.readAll();
		})
		window.addEventListener("blur", (event) => {
			this.setWindowFocus(false);
			socket.emit('toggleOnline');
		})
    }
	
}

ReactDOM.render(
	<App />, appSection
)