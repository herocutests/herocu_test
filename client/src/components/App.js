import React from "react";
import ChatContainer from "./ChatContainer";
import LoginApp from "../containers/LoginApp";
import Audio from "./Audio";

const App = () => (
    <div>
		<ChatContainer />
		<LoginApp />
		<Audio />
	</div>
);

export default App;