function carregar(){
		var infoautor = document.getElementById('infoAutor');
    	var infomusica = document.getElementById('infoMusica');
    	var letra = document.getElementById('letraAqui');

		infoautor.innerHTML = localStorage.autor;
    	infomusica.innerHTML = localStorage.nome;
    	letra.innerHTML = localStorage.musica;
}
buscar.addEventListener('click', function() {

    var artista = document.getElementById('art').value;
    var musica = document.getElementById('mus').value;
     
    fetch("https://api.vagalume.com.br/search.php" + "?art=" + artista + "&mus=" + musica + "&apikey={a3e8564cd20ae4f5c898dd705a2e8c22}")
    .then(function(response){
    	if(!response.ok) throw new Error('Música não encontrada. \nVerifique se você digitou corretamente o que se pede.');
    	return response.json();
    })
    .then(function(data){
        console.log(data);
    	if(data.type == "notfound") throw new Error('Autor nao encontrado.');
    	if(data.type == "song_notfound") throw new Error('Musica nao encontrada.');
    	localStorage.setItem('autor', data.art.name );	
    	localStorage.setItem('nome', data.mus[0].name );
    	localStorage.setItem('musica', data.mus[0].text );

    	carregar();

    })
    .catch(function(error){
    	alert(error.message);
    })
});

document.onchange = carregar();