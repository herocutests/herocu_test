import React from "react";
import Sticker from "../containers/Sticker";

let img = [];

const Stickers = () => (
    let canSend = true;
	for(var i = 1; i <= 48; i++){ 
		img.push(<Sticker key={"sticker_"+i} i={i} canSend={canSend} />);
	}
	return (
		<div className='stickerModal'>
			{img}
	    </div>
	)
);

export default Stickers;