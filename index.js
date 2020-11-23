let elementReferences = [];
const colors = ['blue', 'green', 'yellow', 'orange']

function dragstart(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function dragover(ev) {
  ev.preventDefault();
  return false
}

function drop(ev) {
  var data = ev.dataTransfer.getData("text");
  data = document.getElementById(data);
  if (!elementReferences.some(element => element.id === data.id)) {
    ev.preventDefault();
    ev.currentTarget.appendChild(data);
    const id = ev.target.lastChild.id;
    if (!elementReferences.some(element => element.id === id)) {
      elementReferences.push({ id: id, elem: ev.target.lastChild })
    }
    changeColors();
  }
}

function dragend(ev) {
  return false;
}

function changeColors() {
  const colorCopy = Object.assign([], colors);
  const elementReferencesCopy = Object.assign([], elementReferences);
  if (elementReferences.length === 1) { //Si solo hay un elemento
    elementReferencesCopy.shift().elem.classList = colorCopy.shift() //Le añado el primer color (Azul)
  } else { //Si hay más de un elemento
    elementReferencesCopy.pop().elem.classList = colorCopy.pop() //Le adjudico al ultimo elemento el ultimo color (Naranja)
    elementReferencesCopy.map((elem, i) => elem.elem.classList = colorCopy[i]); //Al resto de elementos les adjudico el color correcpondiente al indice de los arrays
  }
}