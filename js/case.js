const mainTemplate = document.querySelector("#main-template");
const elementToClone = mainTemplate.content.querySelector("#todo-item-template");

const getCaseElement = (data, id) => {
	const element = elementToClone.cloneNode(true);
	element.querySelector('.todo-item__span').textContent = data;
	element.querySelector('.item-input-check').id = `itemCheck-${id}`;
	element.querySelector('.item-check-label').setAttribute('for', `itemCheck-${id}`);
	return element;
}
const Case = function(data, id, boolean = false, App){
	this.data = data;
	this.element = getCaseElement(this.data, id);

	this.state = boolean;


	this.checkElement = this.element.querySelector('.item-input-check');
	this.closeElement = this.element.querySelector('.todo-item__close');

		this.remove = () => {
		this.element.parentNode.removeChild(this.element);
		App.todoList = App.todoList.filter((el) => {
			return (el.element !== this.element);
		});
		App.changeLeftCase(App.leftItem);

	}
	this.changeState = (evt) => {

		if(evt.target.checked){
			this.state = true;
		}
		else {
			this.state = false;
		};
		App.changeLeftCase(App.leftItem);
	};

	this.closeElement.addEventListener('click', this.remove);
	this.checkElement.addEventListener('change', this.changeState)
};

export default Case;
