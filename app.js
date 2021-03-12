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
      console.log(grilla[i][j] = obtenerItemsAlAzar(items));
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
    if(sonAdyacentes(cuadradoClickeado, e.target)){
      intercambiarCuadrados(cuadradoClickeado, e.target)
      borrarMatches();
      // rellenarEspacios(cuadradoClickeado, e.target);
    } else {

    }
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

const intercambiarCuadrados = (cuadrado1, cuadrado2) => {
  const datax1 = Number(cuadrado1.dataset.x);
  const datax2 = Number(cuadrado2.dataset.x);
  const datay1 = Number(cuadrado1.dataset.y);
  const datay2 = Number(cuadrado2.dataset.y);

  const tamanio = 50;
  // Modificar la grilla en Js

  let variableTemporal = grilla[datax1][datay1];
  grilla[datax1][datay1] = grilla[datax2][datay2];
  grilla[datax2][datay2] = variableTemporal;

  // Modificar la grilla en DOM

  if(datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 -1)){
    cuadrado1.style.left = `${datay2 * tamanio}px`;
    cuadrado2.style.left = `${datay1 * tamanio}px`;
    cuadrado1.dataset.y = datay2;
    cuadrado2.dataset.y = datay1;
  }else if(datay1 === datay2 && (datax1 === datax2 + 1 || datax1 === datax2 -1)){
    cuadrado1.style.top = `${datax2 * tamanio}px`;
    cuadrado2.style.top = `${datax1 * tamanio}px`;
    cuadrado1.dataset.x = datax2;
    cuadrado2.dataset.x = datax1;
  }
}

const buscarMatchHorizontal = () => {
  for (let i = 0; i < grilla.length; i++) {
      for (let j = 0; j < grilla[i].length; j++) {
          if (
              grilla[i][j] === grilla[i][j + 1] &&
              grilla[i][j + 1] === grilla[i][j + 2]
          ) {
              const div = document.querySelector(`div[data-x="${i}"][data-y="${j}"]`);
              div.innerHTML = "";
              grilla[i][j] = null;
              const divDos = document.querySelector(
                  `div[data-x="${i}"][data-y="${j + 1}"]`
              );
              divDos.innerHTML = "";
              grilla[i][j + 1] = null;
              const divTres = document.querySelector(
                  `div[data-x="${i}"][data-y="${j + 2}"]`
              );
              divTres.innerHTML = "";
              grilla[i][j + 2] = null;
              rellenarEspacios(div, divDos, divTres)
          }
      }
  }
};
const buscarMatchVertical = () => {
  for (let i = 0; i < grilla.length; i++) {
      for (let j = 0; j < grilla[i].length; j++) {
          if (
              grilla[i + 1] &&
              grilla[i + 2] &&
              grilla[i][j] === grilla[i + 1][j] &&
              grilla[i][j] === grilla[i + 2][j]
          ) {
              const uno = document.querySelector(`div[data-x="${i}"][data-y="${j}"]`);
              uno.innerHTML = "";
              grilla[i][j] = null;
              const dos = document.querySelector(
                  `div[data-x="${i + 1}"][data-y="${j}"]`
              );
              dos.innerHTML = "";
              grilla[i + 1][j] = null;
              const tres = document.querySelector(
                  `div[data-x="${i + 2}"][data-y="${j}"]`
              );
              tres.innerHTML = "";
              grilla[i + 2][j] = null;
          }
      }
  }
};

const rellenarEspacios = (div, div2, div3)  => {
  const datax1 = Number(div.dataset.x);
  const datax2 = Number(div2.dataset.x);
  const datax3 = Number(div3.dataset.x);
  const datay1 = Number(div.dataset.y);
  const datay2 = Number(div2.dataset.y);
  const datay3 = Number(div3.dataset.y);
  // for (let index = 0; index < grilla.length; index++) {
    console.log(datax1, datay1)
    console.log(grilla[datax1][datay1])
    console.log(grilla[datax1 - 1][datay1])
    grilla[datax1][datay1] = grilla[datax1 - 1][datay1]
    div.style.top = `${datax1 * 50}px`;

  // }
}

const borrarMatches = () => {
    buscarMatchVertical()
    buscarMatchHorizontal()
}

borrarMatches()



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


