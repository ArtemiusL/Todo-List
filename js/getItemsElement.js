	const mainTemplate = document.querySelector("#main-template");
	const elementToClone = mainTemplate.content.querySelector("#mainTodoapp");

	const getItemsElement = () => {
		const element = elementToClone.cloneNode(true);
		return element;
	}

export default getItemsElement;