import Case from './case';
import renderTodoList from './render';
import getItemsElement from './getItemsElement';


const Items = function(){
	this.state = "ALL";
	this.todoList = [];
	this.checkState = false;

	this.element = getItemsElement();

	this.writeInput = this.element.querySelector("#mainWriteInput");
	this.leftItem = this.element.querySelector('#leftItem');
	this.writeCheck = this.element.querySelector('#writeCheck');
	this.filtersWrap = this.element.querySelector(".filters");

	this.append = (elementContainer) => {
		elementContainer.appendChild(this.element);
	};

	this.filtersWrap.addEventListener('click', (evt) => {
	if(evt.target.classList.contains('filter-btn')) {
		const btns = this.filtersWrap.querySelectorAll(".filter-btn");
		btns.forEach(function(el){
			el.classList.remove('active');
		});
		evt.target.classList.add('active');
		this.changeState(evt.target.id);

	};
	if(evt.target.classList.contains('btn-clear-completed')){
		this.todoList = this.todoList.filter(function(element){
				return !element.state;
			});
			this.changeState();
	}
	});


	this.writeCheck.addEventListener('change', () => {
	this.checkAll();
	});

		this.createChild = (data, state = false) => {
		const newElement = new Case(data, this.todoList.length + 1, state, this);
		this.pushTodoList(newElement);
		return newElement;
	};


	this.writeInput.addEventListener("keyup", (evt) => {
	if(evt.key == "Enter"){
		const data = this.writeInput.value
		if(data){
		this.createChild(data);
		this.writeInput.value = null;
		this.changeLeftCase(this.leftItem);
		this.changeState();
		};

	};

	});


	//для отображения оставшихся активных задач
	this.changeLeftCase = (domElement) => {
		this.leftCase = this.todoList.filter(function(element){
				return !element.state;
			});

		//если все элементы списка чекнутые меняем состояние списка
		if(this.leftCase.length == 0){
			this.checkState = true;
			this.writeCheck.checked = true;
		}
		if(this.leftCase.length == this.todoList.length){
			this.checkState = false;
			this.writeCheck.checked = false;
		}

		//если все элементы списка чекнутые меняем состояние списка
		domElement.innerHTML = this.leftCase.length;
	};
	this.checkAll = () => {
		if(!this.checkState){
			this.todoList.forEach((item) => {
			item.checkElement.checked = true;
			item.state = true;
		});
			this.checkState = true;
			this.changeLeftCase(this.leftItem);
		}
		else {
			this.todoList.forEach((item) => {
			item.checkElement.checked = false;
			item.state = false;
		});
			this.checkState = false;
			this.changeLeftCase(this.leftItem);
		}
		
	};
	//для отображения оставшихся активных задач

	this.pushTodoList = (caseEl) => {
		this.todoList.push(caseEl);
	};

	this.renderFromStorage = (arrayStorage, state, parent) => {
		this.state = state;
		arrayStorage.forEach((item, number) => {

		this.createChild(item.data, item.state);
		});
		this.changeLeftCase(this.leftItem);
		this.changeState();
	};
	this.btnFilter = this.element.querySelectorAll('.filter-btn');
	this.changeState = (state) => {
		if(state){
			this.state = state;
		}
		let newTodo;
		//элемент куда мы отрисовываем
		const todoItems = this.element.querySelector("#todoItems");
		//элемент куда мы отрисовываем

		switch (this.state) {
			case 'ALL':
				renderTodoList(this.todoList, todoItems);
				break;
			case 'ACTIVE':
				newTodo = this.todoList.filter(function(element){
				return !element.state;
			});
				renderTodoList(newTodo, todoItems);
				break;
			case 'COMPLETED':
				newTodo = this.todoList.filter(function(element){
				return element.state;
			});
				renderTodoList(newTodo, todoItems);
				break;
		}
		this.btnFilter.forEach((item) => {

			if(item.id === `${this.state}`) {
					item.classList.add('active');
			}
			else if(item.classList.contains('active')){
				item.classList.remove('active');
			}
		});
	};



	this.changeLocalStorage = () => {
	setTimeout(() => {

	localStorage.setItem("todoList", JSON.stringify(this.todoList));
	localStorage.setItem("AppState", this.state);
	this.changeLocalStorage();
	}, 1000);
	};
};

export default Items;
