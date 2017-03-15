const FontFaceObserver = require('fontfaceobserver');

const font = new FontFaceObserver('source_sans_pro');

font.load().then(() => {
	console.log('Font has loaded.');
}).catch(() => {
	console.log('Font failed to load.');
});
