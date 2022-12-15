const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


function createElement(template) {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstElementChild; // 3
}


function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};
