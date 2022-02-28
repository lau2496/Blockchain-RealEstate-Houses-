App = {
	contracts: {},
	init: async () => {
	  await App.loadWeb3();
	  await App.loadAccount();
	  await App.loadContract();
	  await App.render();
	  await App.renderHouses();
	},
	
	loadWeb3: async () => {
	  if (window.ethereum) {
		App.web3Provider = window.ethereum;
		await window.ethereum.request({ method: "eth_requestAccounts" });
	  } else if (web3) {
		web3 = new Web3(window.web3.currentProvider);
	  } else {
		console.log(
		  "No hay ningún navegador ethereum instalado. Instala MetaMask "
		);
	  }
	},

	//Carga la cuenta de metamask en la que estamos
	loadAccount: async () => {
	  const accounts = await window.ethereum.request({
		method: "eth_requestAccounts",
	  });
	  App.account = accounts[0];
	},

	loadContract: async () => {
	  try {
		const res = await fetch("Owners.json");
		const ownersJSON = await res.json();
		App.contracts.Owners = TruffleContract(ownersJSON);
		App.contracts.Owners.setProvider(App.web3Provider);
  
		App.owners = await App.contracts.Owners.deployed();
	  } catch (error) {
		console.error(error);
	  }
	},

	render: async () => {
	  document.getElementById("account").innerText = App.account;
	},

	//Mostrar todas las casas almacenadas
	renderHouses: async () => {
	  const housesCounter = await App.owners.total();
	  const housesCounterNum = housesCounter.toNumber();
  
	  let html = "";
  
	  for (let i = 1; i <= housesCounterNum; i++) {
		const house = await App.owners.houses(i);
		console.log(house)
		const houseId = house[0].toNumber();
		const seller = house[1];
		const state = house[2];
		const street = house[3];
		const rooms = house[5];
		const precio = house[4];
		const isAvailable = house[6];

		//Ruta de las imagenes de cada casa
		const image= "images/house" + houseId +".jpg";

  
		//Cargar de casas que se van añadiendo
		let htmlElement = `<div class="card bg-dark rounded-0 mb-2">
		  <div class="card-header d-flex justify-content-between align-items-center">
		  <div class="panel-heading">
		 	 <br/><br/><h3 class="panel-title">${street}</h3>
         </div>
			<div id="contenedor">
				<div class="content">
					<img alt="140x140" class="img-rounded img-center" width="240px" height="240px" src="${image}" data-holder-rendered="true">
					<br/><br/>
					<button class="btn btn-default btn-buy" type="button" id="${houseId}" ${isAvailable === false && "disabled"}>Comprar</button>
				</div>
		 	 <div class="content">
		 		 <h4 class="house-seller" style = "font-family:helvética;">Vendedor: ${seller}</h4>
		 		 <h4 class="house-state" style = "font-family:helvética;">Estado: ${state}</h4>
		 		 <h4 class="house-rooms" style = "font-family:helvética;">Habitaciones: ${rooms}</h4>
        		  <h4 class="house-precio" style = "font-family:helvética;">Precio: ${precio} Eth</h4>
		 	 </div>
		  </div>
		  </div>
		</div>`;
		html += htmlElement;
	  }
  
	  document.querySelector("#housesList").innerHTML = html;
	},

	//Envia los datos del formulario y crea una nueva casa
	createHouse: async (seller, state, street,precio, rooms) => {
	  try {
		const result = await App.owners.addNewHouse(seller, state, street, precio, rooms,{
		  from: App.account,
		});
		console.log(result.logs[0].args);
		window.location.reload();
	  } catch (error) {
		console.error(error);
	  }
	},

	//Llama a la funcion comprar y marca esa casa como vendida
	buyHouse: async (houseId) =>  {
		try {
			const result = await App.owners.buy(houseId, { from: App.account,  });
			console.log(result.logs[0].args);
			window.location.reload();
		  } catch (error) {
			console.error(error);
		  }
	}

  };