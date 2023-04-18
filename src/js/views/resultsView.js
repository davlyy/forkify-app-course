import icons from 'url:../../img/icons.svg'
import View from './View'
import previewView from './previewView';
class ResultsView extends View{

    _parentElement = document.querySelector('.results')
    _errorMessage = "No recepies found for your query!"
    _message = '';

    _generateMarkup(){
        return this._data.map(res => previewView.render(res,false)).join('')
    }

    // _generateMarkupPreview(result){

    //   const id = window.location.hash.slice(1);



    //     return `
    //     <li class="preview">
    //     <a class="preview__link ${ result.id===id ? "preview__link--active" : ''}" href="#${result.id}">
    //       <figure class="preview__fig">
    //         <img src="${result.image}" alt="Test" />
    //       </figure>
    //       <div class="preview__data">
    //         <h4 class="preview__title">${result.title}</h4>
    //         <p class="preview__publisher">${result.publisher}</p>
            
    //       </div>
    //     </a>
    //   </li>
    //     `
    // }
}

export default new ResultsView();