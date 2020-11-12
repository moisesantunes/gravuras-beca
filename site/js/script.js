function glink(){
	return document.location.href;
}
function mostra_banner(nome_img, id_img, ref_img){
//alert(nome_img+id_img+ref_img)
let link_f=glink()+"figura.html?id="+id_img
	let banner_img =`
	<div id='banner'>
		<h2>${ref_img}</h2>
		<img   src='gravuras/${nome_img}'>
		<div id='b_social'>
			<a href="whatsapp://send?text=${link_f}" title="Acesse de seu smartphone para enviar por WhatsApp">
				<img   src='/images/whatsapp.png'>
			</a>
			<a href="/gravuras/${nome_img}" download="${ref_img}.jpg">
				<img src="/images/photo.png" alt="baixar" >
			</a>
			<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=${ref_img}&url=${link_f}&via=moansilva">
				<img   src='/images/twitter.png'>	
			</a>
		</div>
		<div id="bot-volta" >
			<a href="/" >voltar</a>
		</div>
		
	</div>`
	let boxContainer = document.getElementById('box-container')	
	//apaga os cards
	boxContainer.querySelectorAll('SECTION').forEach(n => n.remove());
	//insere o banner
	let banner =document.createElement("SECTION");
	banner.innerHTML =banner_img;
	boxContainer.appendChild(banner)

}

function logResult(result) {
  let conteudo='';
  let boxContainer = document.getElementById('box-container')
  for(let r of result){
  	conteudo =`
  			<div id='card'>
  				<a href='javascript:mostra_banner("${r.nomegrav}","${r.id}","${r.refgrav}")'>
  					<img   src='gravuras/${r.nomegrav}'>
     				<p>${r.refgrav}</p>
     			</a>
     		</div>`
     		
     let card =document.createElement("SECTION");
     card.id ="card-container";
     card.innerHTML =conteudo;
     boxContainer.appendChild(card)
    }
  ///  box.innerHTML= conteudo; 
 /// 
}

function logError(error) {
  console.log('Looks like there was a problem: \n', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}
//////// Ajax para todas as gravu
function fetchJSON(arquivo) {
  fetch(arquivo) // 1
  .then(validateResponse) // 2
  .then(readResponseAsJSON) // 3
  .then(logResult) // 4
  .catch(logError);
}
/////// para filtro 
function fetchGravura(elemento) {
  fetch('bases/lista-imgs.json') // 1
  .then(validateResponse) // 2
  .then(readResponseAsJSON) // 3
  .then(function logGravura(result) {
 		let g = result.find(item => item.id == elemento)
  		document.getElementById('banner-img').innerHTML=`
  			<div id='banner'>
	  			<h2>${g.refgrav}</h3>
	  			<img   src='gravuras/${g.nomegrav}'>
	  			<div id='b_social'>
		  			<a href="whatsapp://send?text=${encodeURIComponent(glink())}" title="Acesse de seu smartphone para enviar por WhatsApp">
		  				<img   src='/images/whatsapp.png'>
		  			</a>
		  			<a href="/gravuras/${g.nomegrav}" download="${g.refgrav}.jpg">
		  				<img src="/images/photo.png" alt="baixar" >
		  			</a>
		  			<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=${g.refgrav}&url=${glink()}&via=moansilva">
		  				<img   src='/images/twitter.png'>	
		  			</a>
		  			
		  		</div>
	  		</div>`
 ///
}) // 4
  .catch(logError);
}
