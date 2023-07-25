import { data } from "./data-info.js";


const menu = document.querySelector('.menu-list');
const usersContainer = document.querySelector('.users-container');
const modal = document.querySelector('.modal-container');
let menuItemSelect ;

//vializamos o no el modal a traves de una clase
const toggleModal = (state) => {
  state ?
  modal.classList.remove('invisible')
  : modal.classList.add('invisible');
}


//renderizamos el modal segun el usuario seleccionado
const handleRenderModal = (data) => {
  const button = document.createElement('button');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');

  button.textContent = 'Cerrar';
  h2.textContent = data.title;
  p.textContent = data.description;

  button.addEventListener('click', ()=> toggleModal(false));

  modal.innerHTML = '';
  modal.appendChild(button);
  modal.appendChild(h2);
  modal.appendChild(p);

  toggleModal(true);
}

const renderDataUser = (data, node) => {
  /*
  <article class="user-card">
    <figure class="user-image">
      <img src="" alt="imagen random">
    </figure>
    <h2 class="user-title">Titulo</h2>
    <p class="user-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim deserunt odio excepturi minus architecto exercitationem incidunt officiis alias, eos sed itaque quis officia fugit modi placeat dolorem hic quos.</p>
    <a href='#'>Concer más ...>
  </article>
  */

  //creamos los nodos
  const article = document.createElement('article');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const div = document.createElement('div');
  const button = document.createElement('button');
  const icon = document.createElement('img');

  //completamos la informacion
  img.src = data.url;
  h2.textContent = data.name;
  h3.textContent = data.title;
  p.textContent = data.description;
  button.textContent = 'Conoce más';
  icon.src = 'arrow.png';

  //agregamos el evento de modal al link "conocer más"
  button.addEventListener('click',() => handleRenderModal(data));

  //anidamos los nodos

  figure.appendChild(img);
  div.appendChild(button);
  div.appendChild(icon);
  article.appendChild(figure);
  article.appendChild(h2);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(div);

  //agregamos el contenido a contenedor
  node.appendChild(article);
}  

const handleMenuItem = (event) => {  
  const year = event.target.text;
  const itemParent = event.target.parentNode;
  
  //agremos la seleccion al item elegido por el usuario y quitamos la seleccion del item anterioir
  menuItemSelect.classList.remove('selected');
  itemParent.classList.add('selected');
  menuItemSelect = itemParent;

  const dataYear = data.filter(item => item.age == year);
  usersContainer.innerHTML = '';
  dataYear[0].users.forEach(item => renderDataUser(item, usersContainer));
}

//render dinamico del menu
const renderMenuItem = (year, node, selected)=> {

  const itemMenu = document.createElement('li');
  const link = document.createElement('a');
  link.textContent = year;
  link.href = '#';
  link.addEventListener('click', handleMenuItem);
  itemMenu.classList = 'menu--item';

  //selecionamos el primer item de menu y lo guardamos
  if(selected) {
    itemMenu.classList.add('selected');
    menuItemSelect = itemMenu;
  }

  itemMenu.appendChild(link);
  node.appendChild(itemMenu);
}

//Creamos el menu dinamico a partir de la info
data.map(item => renderMenuItem(item.age, menu, item.selected));

//creamos el render inicial del primer año
data[0].users.forEach(item => renderDataUser(item, usersContainer));
