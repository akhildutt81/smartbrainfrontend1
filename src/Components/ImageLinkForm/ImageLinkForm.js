import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
	return (
		<div>
			<p className='f3'>
				{'Detect Faces in your picture. Give it a try'}
			</p>
			<div className='center'>
				<div className='center bg pa4 br3 shadow-3'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/> 
					<button 
						className='w-30 grow bg-light-purple f4 ph3 pv2 dib  white link' 
						onClick={onButtonSubmit}>
					Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;