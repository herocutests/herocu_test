import React from "react";
import ChatMessagesBlock from "../containers/ChatMessagesBlock";
import MessageForm from "../containers/MessageForm";
import UserTyping from "../containers/UserTyping";
import UsersList from "../containers/UsersList";

const ChatContainer = () => (
    <section className="container">
		<ChatMessagesBlock />
		<UserTyping />
		<div className="row">
			<div className="col-12">
				<MessageForm />
				<UsersList  />
			</div>
		</div>
	</section>
);

export default ChatContainer;