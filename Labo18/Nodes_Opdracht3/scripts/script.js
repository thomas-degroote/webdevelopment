const setup = () => {
	document.getElementById("maakPelement").addEventListener('click', maakElement)
}

const maakElement = () => {
	const div = document.getElementById("myDIV");
	const p = document.createElement("p");
	p.textContent = "Dit is een nieuw P-element"
	div.append(p)
}
 
window.addEventListener("load", setup);