import React from "react";

const Audio = () => (
    <audio id="chatAudio">
	   	<source src={process.env.PUBLIC_URL+"/notify.ogg"} type="audio/ogg" />
	   	<source src={process.env.PUBLIC_URL+"/notify.mp3"} type="audio/mpeg" />
	   	<source src={process.env.PUBLIC_URL+"/notify.wav"} type="audio/wav" />
	</audio>
);

export default Audio;