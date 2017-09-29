import Items from './items';

const storage = JSON.parse(localStorage.getItem("todoList"));
const storaggeAppState = localStorage.getItem("AppState");
const mainAppContainer = document.querySelector('.main-content');
let App = new Items();
window.App = App;
App.append(mainAppContainer);


const initialApp = () => {
if(storage){
App.renderFromStorage(storage, storaggeAppState);
App.changeState();
App.changeLeftCase(App.leftItem);
}
else {
return false;
}
};
initialApp();

App.changeLocalStorage();


