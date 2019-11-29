
export class NewSongs {

  constructor( ) { }

  titulosLocalStorage = JSON.parse(window.localStorage.getItem('titulos'));
  musicasLocalStorage = JSON.parse(window.localStorage.getItem('musicas'));

  // Escreva os títulos das músicas entre aspas simples separados por virgula
  novosTitulos = ['Magnificat'];

  // Crie um array para cada música que você quer adicionar
  Magnificat = [
    // _________________________________
    'Intro : G, C9 (2X)',
    ' ',
    'G             C9          G',
    'Maravilhas fizeste em mim',
    'G                   C9',
    'Minha alma transbordaste',
    '           G',
    'de alegria',
    'G             C9',
    'Manifestaste o poder',
    '            G',
    'do teu abraço',
    'G               C9',
    'Meu coração saciaste',
    '           G',
    'noite e dia',
    ' ',
    'Am                        Bm7',
    'Misericórdia geraste em mim',
    'Am                          F',
    'Minha alma acolheste com amor',
    'D',
    '(E o meu coração) confiaste ao Redentor!',
    ' ',
    'Refrão:',
    'G',
    'Meu espírito exulta de alegria',
    'D                          Am',
    'Em Deus, meu Senhor e Salvador',
    'D',
    'Senhor e Salvador!',
    'G',
    'Porque puseste em mim, doce Maria,',
    'D',
    'Teus olhos de ternura',
    '          Am',
    'e de amor',
    'D',
    'Ternura e de amor',
    'G C9  G (2X)',
    'Manifesta em mim Teu amor!',
    'G',
    'Magnificat!',
    'D       Am  D',
    'Magnificat'
  ];

  async update(titulosLocalStorage) {
    const novosTitulos = this.novosTitulos;
    const MusicasQueSeraoAdicionadas = new Array();
    // Coloque os nomes das variaveis na mesma ordem de novosTitulos
    const musicas = [this.Magnificat];
    let check = 0;
    if (novosTitulos.length > 0) {
      for (let count = 0; count <= (novosTitulos.length) - 1; count ++) {
        for (let count2 = 0; count2 <= titulosLocalStorage.length; count2 ++) {
          if (titulosLocalStorage[count2] === novosTitulos[count]) {
            check ++;
          }
        }
        console.log(check);
        if (check === 0) {
          const value = count;
          MusicasQueSeraoAdicionadas.push(value);
        }
      }
      console.log(MusicasQueSeraoAdicionadas.length);
      if ((MusicasQueSeraoAdicionadas.length) > 0) {
        for (let count = 0; count <= MusicasQueSeraoAdicionadas.length - 1; count ++) {
          const musicasLS = JSON.parse(window.localStorage.getItem('musicas'));
          const titulosLS = JSON.parse(window.localStorage.getItem('titulos'));
          const vivenciasLS = JSON.parse(window.localStorage.getItem('vivencias'));
          const favoritasLS = JSON.parse(window.localStorage.getItem('favoritas'));

          titulosLS.push(novosTitulos[MusicasQueSeraoAdicionadas[count]]);
          musicasLS.push('mus' + musicasLS.length);
          vivenciasLS.push('x');
          favoritasLS.push('x');

          window.localStorage.setItem(
            ('mus' + (musicasLS.length - 1)),
            JSON.stringify(musicas[MusicasQueSeraoAdicionadas[count]])
          );
          window.localStorage.setItem('musicas', JSON.stringify(musicasLS));
          window.localStorage.setItem('titulos', JSON.stringify(titulosLS));
          window.localStorage.setItem('vivencias', JSON.stringify(vivenciasLS));
          window.localStorage.setItem('favoritas', JSON.stringify(favoritasLS));
        }
        window.localStorage.setItem('atualizar', JSON.stringify('atualizou'));
      }
    }
  }
}
