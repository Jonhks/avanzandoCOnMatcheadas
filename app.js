const grillaEnHTML = document.querySelector('.grilla');

const items = ['🧩','🎰', '🎮','🎳','🎯','🎲'];
let grilla = [];

const obtenerNumeroAlAzar = items =>{
  return Math.floor(Math.random() * items.length);
};

const obtenerItemsAlAzar = items => {
  return items[obtenerNumeroAlAzar(items)];
};


// ------------- Generar Grilla

const generarGrilla = (ancho, alto) => {
  grilla = [];
  for (let i = 0; i < ancho; i++) {
    grilla[i] = [];
    for (let j = 0; j < alto; j++) {
      grilla[i][j] = obtenerItemsAlAzar(items)
    };
  };
  return grilla;
};


const generarCuadrado = (x, y, array) => {
  const tamanio = 50;
  const cuadrado = document.createElement('div');
  cuadrado.dataset.x = x;
  cuadrado.dataset.y = y;
  cuadrado.innerHTML = array[x][y];
  cuadrado.style.top = `${x * tamanio}px`;
  cuadrado.style.left = `${y * tamanio}px`;
  cuadrado.addEventListener('click', cuadradoSeleccionado)
  return cuadrado
}


// --------- Pintar la grilla en el HTML

const agregarGrillaAHTML = ancho => {
  const anchoGrilla = 50 * ancho;
  grillaEnHTML.style.width = `${anchoGrilla}px`;
  const listaDeEmojis = grilla;
  grillaEnHTML.innerHTML= '';
  for (let i = 0; i < listaDeEmojis.length; i++) {
    for (let j = 0; j < listaDeEmojis[i].length; j++) {
      grillaEnHTML.appendChild(generarCuadrado(i, j, listaDeEmojis))
    }
  }
}

const cuadradoSeleccionado = e => {
  let cuadradoClickeado = document.querySelector('.seleccionar');
  if(cuadradoClickeado){
    // console.log('Son dos elementos');
    console.log(sonAdyacentes(cuadradoClickeado, e.target))
    // console.log(cuadradoClickeado, e.target)
  } else {
    // console.log('Es el primer elemento');
    e.target.classList.add('seleccionar');
  }
  // console.log(cuadradoClickeado);
}


const sonAdyacentes = (cuadrado1, cuadrado2) => {
  const datax1 = Number(cuadrado1.dataset.x);
  const datax2 = Number(cuadrado2.dataset.x);
  const datay1 = Number(cuadrado1.dataset.y);
  const datay2 = Number(cuadrado2.dataset.y);
  if(
  //    0        0      y   0            1
    (datax1 === datax2 && datay1 === datay2 + 1) ||
    (datax1 === datax2 && datay1 === datay2 - 1) ||
    (datay1 === datay2 && datax1 === datax2 + 1) ||
    (datay1 === datay2 && datax1 === datax2 - 1)
    ){
      return true
  }
  return false
}

generarGrilla(9,9);
agregarGrillaAHTML(9);

// [  i == 0                        i
//   ['🧩','🎰', '🎮','🎳','🎯','🎲'], 0
//     0    1     2   3    4    5   -----------        j
//   ['🧩','🎰', '🎮','🎳','🎯','🎲'], 1
//   //0    1     2    3   4    5 
//   ['🧩','🎰', '🎮','🎳','🎯','🎲'], 2
//   ['🧩','🎰', '🎮','🎳','🎯','🎲'], 3
// ]


