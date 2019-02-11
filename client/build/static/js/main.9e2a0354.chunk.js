(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{38:function(e,t,s){e.exports=s(39)},39:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(2),r=s(4),i=s(3),o=s(5),c=s(0),u=s.n(c),l=s(35),d=s.n(l),g=(s(44),s(45),s(36)),p=s.n(g),m=s(37),h=s.n(m),f=document.getElementById("chatApp"),y=p()(),v={isEnterButton:function(e){return 13===e.keyCode},isEnterCtrlButton:function(e){return!(10!==e.keyCode&&13!==e.keyCode||!e.ctrlKey)},isEmptyValue:function(e){return""===e},numericEnding:function(e,t,s,n){var a=Math.abs(e);return(a%=100)>=5&&a<=20?n:1===(a%=10)?t:a>=2&&a<=4?s:n},parseTime:function(e){var t=new Date(e);return("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"},parseDate:function(e){var t=new Date(e),s=new Date;return v.compareDates(t,s)?"\u0421\u0435\u0433\u043e\u0434\u043d\u044f":(s.setDate(s.getDate()-1),v.compareDates(t,s)?"\u0412\u0447\u0435\u0440\u0430":t.getDate()+"."+t.getMonth()+"."+t.getFullYear())},compareDates:function(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()&&e.getDate()===t.getDate()}},E=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"username"},u.a.createElement("h1",null,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f"),u.a.createElement("input",{type:"text",id:"nickname",onKeyUp:function(t){return e.props.checkEnterKey(t)}}),u.a.createElement("p",{className:"userWarning"},this.props.error))}}]),t}(u.a.Component),O=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={error:""},s.checkEnterKey=function(e,t){var n=e.target.value.replace(/ /g,"");v.isEmptyValue(n)?s.incorrectLogin():(s.clearError(),v.isEnterButton(e)&&s.sendLogin(n))},s.sendLogin=function(e){y.emit("userName",{user:e})},s.existLogin=function(){s.setErrorStateFun("\u0422\u0430\u043a\u043e\u0439 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0443\u0436\u0435 \u0435\u0441\u0442\u044c")},s.incorrectLogin=function(){s.setErrorStateFun("\u041d\u0435\u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u043e\u0435 \u0438\u043c\u044f")},s.clearError=function(){s.setErrorStateFun("")},s.setErrorStateFun=function(e){s.setState({error:e})},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return u.a.createElement(E,{error:this.state.error,checkEnterKey:this.checkEnterKey})}},{key:"componentWillMount",value:function(){var e=this;y.on("existUsername",function(){e.existLogin()}),y.on("incorrectUsername",function(){e.incorrectLogin()})}}]),t}(u.a.Component),b=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={usersList:{},uid:0,midEdit:-1,message:""},s.messageEdited=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";s.setEditMessage(e,t)},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"setEditMessage",value:function(e,t){this.setState({midEdit:e,message:t})}},{key:"setUsers",value:function(e){this.setState({usersList:e})}},{key:"setUid",value:function(e){this.setState({uid:e})}},{key:"render",value:function(){return u.a.createElement("section",{id:"chatSection"},u.a.createElement(j,{uid:this.state.uid,usersList:this.state.usersList,editMessage:this.messageEdited,edditingMessage:this.state.midEdit}),u.a.createElement(S,{uid:this.state.uid,usersList:this.state.usersList}),u.a.createElement(C,{editMessage:this.state.message,midEdit:this.state.midEdit,messageEdited:this.messageEdited}),u.a.createElement(w,{usersList:this.state.usersList}))}},{key:"componentWillMount",value:function(){var e=this;y.on("chatHistory",function(t){e.setUsers(t.userList)}),y.on("userLoggedIn",function(t){e.setUid(t.uid)}),y.on("toggleOnline",function(t){e.setUsers(t.usersList)}),y.on("chatNewUser",function(t){var s=e.state.usersList;s[t.uid]=t.user,e.setUsers(s)})}}]),t}(u.a.Component),j=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={chatHistory:{}},s.lastReadMessage=0,s.scrollToBottom=function(){var e=document.getElementById("chat");e.scrollTop=e.scrollHeight},s.editMessage=function(e){""!==e&&e!==s.props.edditingMessage?s.props.editMessage(e,s.state.chatHistory[e].msg):s.props.editMessage(-1,"")},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"setHistory",value:function(e){this.setState({chatHistory:e})}},{key:"render",value:function(){var e=this,t="";return u.a.createElement("div",{id:"chat"},Object.keys(this.state.chatHistory).map(function(s){var n=!1,a=!1;return t!==v.parseDate(e.state.chatHistory[s].date)&&(t=v.parseDate(e.state.chatHistory[s].date),a=!0),e.lastMessageUid!==e.state.chatHistory[s].user&&(e.lastMessageUid=e.state.chatHistory[s].user,n=!0),[!0===a?u.a.createElement("div",{className:"newUser dateMessage"},t):"",!0===e.state.chatHistory[s].isSystem?u.a.createElement(M,{message:e.state.chatHistory[s]}):u.a.createElement(k,{message:e.state.chatHistory[s],userChanged:n,userName:!0===n?e.props.usersList[e.lastMessageUid].name:"",userColor:!0===n?e.props.usersList[e.lastMessageUid].color:"",uid:e.props.uid,editMessage:e.editMessage,mid:s,isEdditing:e.props.edditingMessage===s})]}))}},{key:"componentWillMount",value:function(){var e=this;y.on("chatHistory",function(t){e.setHistory(t.chat)}),y.on("rewriteMessage",function(t){var s=e.state.chatHistory;s[t.mid]=t.message,e.setHistory(s)}),y.on("addMessage",function(t){var s=e.state.chatHistory;s[t.id]=t.message,e.setHistory(s)}),y.on("readAll",function(t){for(var s=e.state.chatHistory,n=e.lastReadMessage;n<=t.toMessage;n++)s[n].unread=!1;e.setHistory(s),e.lastReadMessage=t.toMessage})}},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}}]),t}(u.a.Component),M=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return u.a.createElement("div",{className:"newUser"},this.props.message.msg)}}]),t}(u.a.Component),k=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){var e=this,t=!0===this.props.message.unread?"unreadMessages ":"",s=!0===this.props.isEdditing?"editingMessage":"",n="message_container "+(!0===this.props.message.isChanged?"editedMsg ":"")+t+" "+s,a="message_container "+t;return u.a.createElement("div",null,!0===this.props.userChanged?u.a.createElement("div",{className:a},u.a.createElement("div",{className:"date_name"},v.parseTime(this.props.message.date),u.a.createElement("p",{className:"user",style:{color:this.props.userColor}},this.props.userName))):"",u.a.createElement("div",{className:n},u.a.createElement(h.a,{tagName:"p",className:"message",onClick:function(){return e.props.editMessage(e.props.uid===e.props.message.user?e.props.mid:"")}},this.props.message.msg)))}}]),t}(u.a.Component),w=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={count:0},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){var e=this;return u.a.createElement("div",null,u.a.createElement("div",{id:"users_count"},"\u0412 \u0447\u0430\u0442\u0435 ",this.state.count," \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435",v.numericEnding(this.state.count,"\u043b\u044c","\u043b\u044f","\u043b\u0435\u0439"),"."),u.a.createElement("div",{className:"userList"},Object.keys(this.props.usersList).map(function(t){return!1===e.props.usersList[t].inChat?"":u.a.createElement("p",{key:t,className:!0===e.props.usersList[t].online?"user_online":"user_gone"},e.props.usersList[t].name)})))}},{key:"setCount",value:function(e){this.setState({count:e})}},{key:"componentWillMount",value:function(){var e=this;y.on("chatHistory",function(t){e.setCount(t.users)}),y.on("usersCount",function(t){e.setCount(t)})}}]),t}(u.a.Component),S=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={text:""},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return u.a.createElement("p",{id:"usersTyping"},this.state.text)}},{key:"componentWillMount",value:function(){var e=this;y.on("usersTyping",function(t){e.setState({text:0===t.users.length?"":t.users.join(", ")+" \u043f\u0435\u0447\u0430\u0442\u0430"+(t.users.length>1?"\u044e\u0442":"\u0435\u0442")+" \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435:"})})}}]),t}(u.a.Component),C=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).isTyping=!1,s.intervalStopTyping="",s.state={message:""},s.keyPress=function(e){if(v.isEnterCtrlButton(e))e.target.value+="\r\n";else{if(v.isEnterButton(e))return e.preventDefault(),y.emit("addMessage",{message:e.target.value,mid:s.props.midEdit}),s.setState({message:""}),void s.props.messageEdited(-1,"");clearTimeout(s.intervalStopTyping),s.intervalStopTyping=setTimeout(s.stopTyping,1e3),!0!==s.isTyping&&(y.emit("userTyping"),s.isTyping=!0)}},s.stopTyping=function(){y.emit("userStopTyping"),s.isTyping=!1},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"handleChange",value:function(e){this.setState({message:e.target.value})}},{key:"componentWillReceiveProps",value:function(e){this.setState({message:e.editMessage})}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"form-group"},u.a.createElement("textarea",{className:"form-control",rows:"3",value:this.state.message,onKeyDown:function(t){return e.keyPress(t)},ref:"form-control",onChange:function(t){return e.handleChange(t)}}))}}]),t}(u.a.Component),U=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return u.a.createElement("audio",{id:"chatAudio"},u.a.createElement("source",{src:"/src/notify.ogg",type:"audio/ogg"}),u.a.createElement("source",{src:"/src/notify.mp3",type:"audio/mpeg"}),u.a.createElement("source",{src:"/src/notify.wav",type:"audio/wav"}))}}]),t}(u.a.Component),L=function(e){function t(){var e,s;Object(n.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(s=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={isUserSiggedIn:!1,isWindowOnFocus:!0,uid:-1},s.setUserStatus=function(e){s.setState({isUserSiggedIn:e})},s.setWindowFocus=function(e){s.setState({isWindowOnFocus:e})},s.readAll=function(){!0===s.state.isUserSiggedIn&&!0===s.state.isWindowOnFocus&&y.emit("readAll")},s}return Object(o.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return u.a.createElement("div",null,u.a.createElement(b,{uid:this.state.uid}),!1===this.state.isUserSiggedIn?u.a.createElement(O,null):"",!1===this.state.isWindowOnFocus?u.a.createElement(U,null):"")}},{key:"componentWillMount",value:function(){var e=this;y.on("loginUser",function(t){e.setUserStatus(!1)}),y.on("addMessage",function(t){e.readAll(),!0===e.state.isUserSiggedIn&&!1===e.state.isWindowOnFocus&&document.getElementById("chatAudio").play()}),y.on("userLoggedIn",function(t){e.setUserStatus(!0)}),y.on("returnUsername",function(t){e.setUserStatus(!0),e.setUid(t.uid)}),y.on("disconnect",function(){e.setUserStatus(!1)}),window.addEventListener("focus",function(t){e.setWindowFocus(!0),y.emit("toggleOnline"),e.readAll()}),window.addEventListener("blur",function(t){e.setWindowFocus(!1),y.emit("toggleOnline")})}}]),t}(u.a.Component);d.a.render(u.a.createElement(L,null),f)},44:function(e,t,s){},45:function(e,t,s){},71:function(e,t){}},[[38,1,2]]]);
//# sourceMappingURL=main.9e2a0354.chunk.js.map