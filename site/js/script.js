function glink(){
	return document.location.href;
}
/*
<a href="whatsapp://send?text=TITULO &ndash; LINK" title="Acesse de seu smartphone para enviar por WhatsApp">WhatsApp</a>
javascript:{window.location=’https://wa.me/?text='+encodeURIComponent(window.location.href)}
*/
function logResult(result) {
  console.log(result);
  let conteudo='';
  let box= document.getElementById('box')
  //	alert(Object.keys(result[0]))
  for(let r of result){
  //	alert(r.refgrav)
  	conteudo +=`
  			<div id='card'>
  				<a href='figura.html?id=${r.id}'>
  					<img   src='gravuras/${r.nomegrav}'>
     				<p>${r.refgrav}</p>
     			</a>
     		</div>`
    }
  ///  
 box.innerHTML= conteudo; 
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



//fetchJSON('bases/lista-imgs.json');


function oi(mane){
	alert(mane)
}
