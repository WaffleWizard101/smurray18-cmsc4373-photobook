// common super class for all view classes
export class AbstractView {

   parentElement = document.getElementById('spaRoot');

   constructor() {
      if(new.target === AbstractView) {
         throw new Error("Cannot instantiate AbstractView directly!");
      }
   }

   //Called when the view is mounted to the DOM
   // fetch initial data from resources (e.g. DB, API) and update the model
   async onMount() {
      throw new Error("onMount method must be implemented");
   }

   // update the view to reflect updated model
   async render() {
      this.parentElement.innerHTML = '';
      //update the view to the updated model
      const elements = await this.updateView();
      //render the updated view
      this.parentElement.append(elements);
      // add event listeners
      this.attachEvents();
   }

   async updateView() {
      throw new Error('updateView method must be implemented');
   }

   attachEvents() {
      throw new Error('attachEvents method must be implemented');
   }

   //called when the view is unmounted from the DOM
   async onLeave() {
      throw new Error('onLeave method must be implemented');
   }
}