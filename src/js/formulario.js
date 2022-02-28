document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
  
 
  const houseForm = document.querySelector("#houseForm");
  //Obtiene los datos del formulario
  houseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const seller = houseForm["seller"].value;
    const state = houseForm["state"].value;
    const street = houseForm["street"].value;
    const precio = houseForm["price"].value;
    const rooms = houseForm["rooms"].value;

    App.createHouse(seller, state, street, precio, rooms);
  });

  const housesList = document.querySelector("#housesList");
  //Obtiene el atributo id del boton de comprar que corresponde a cada casa
  housesList.addEventListener("click", (e) => {
    e.preventDefault();
    const houseId = e.target.getAttribute('id');

    App.buyHouse(houseId);
  });