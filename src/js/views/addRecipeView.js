import icons from 'url:../../img/icons.svg'
import View from './View'
class AddRecipeView extends View{

    _parentElement = document.querySelector('.upload');


    _overlay = document.querySelector('.overlay');
    _addRecipeWindow = document.querySelector('.add-recipe-window');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe')


    constructor(){
        super();
        this.addHandlerClose();
        this.addHandlerOpen();

    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');    
        this._addRecipeWindow.classList.toggle('hidden');
    }

    addHandlerOpen(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))

    }


    addHandlerClose(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
          e.preventDefault();

          //This keyword points to _parentElement hence enough
          const dataArr = [...new FormData(this)];

          //Transforms Array to Object
          const data = Object.fromEntries(dataArr);
          handler(data);
        });
      }





    _generateMarkup(){
    }




}

export default new AddRecipeView();