'use strict';


//DATABASE

const STORE = {
  items: [
    {name: "apples", checked: false},
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false}
  ],
  showChecked: true
};
  





/***************************USER INPUT*******************************/


//TAKES IN USER INPUT VALUE, resets label to empty--------------------

//Calls addItemToShoppingList so it can store value in database
//Calls renderShoppingList to update the list

//--------------------------------------------------------------------


// function retrieveUserInput(jQuerySelector) {
//   $('#js-shopping-list-form').submit(function(event) {
//     event.preventDefault();

//     //if ($(jQuerySelector).val() === '') return; //prevents user from being able to add empty item (ex: '')

//    // else {
//       const userInput = $(jQuerySelector).val(); //resets input to empty
//       S(jQuerySelector).val('');
//       return userInput;
//     //}
    

//   });
// }


// function handleNewItemSubmit() {

//       const newItemName = retrieveUserInput('.js-shopping-list-entry');
//       addItemToShoppingList(newItemName);
//       renderShoppingList();
    
// }


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    if ($('.js-shopping-list-entry').val() === '') return; //prevents user from being able to add empty item (ex: '')

    else {
      //console.log('`handleNewItemSubmit` ran');
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val(''); //resets input to empty
      addItemToShoppingList(newItemName);
      renderShoppingList();
    }
    
  });
}


//Stores user input in database, defaults to unchecked
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}











/*******************TOGGLES/CHANGES**********************************/


//CHECKS & UNCHECKS ITEM IN LIST--------------------------------------

//Calls toggleCheck to switch the checked state

//--------------------------------------------------------------------

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');

    const itemIndex = $(event.currentTarget).closest('li').attr('data-item-index');

    toggleCheck(itemIndex);
    renderShoppingList();

  });
}


// function getItemIndex(currentTarget) {

//   return currentTarget.closest('li').attr('data-item-index');
// }


//Changes checked property of item in STORE to the opposite of what it currently is 
//(ex: if item.checked === false, toggleCheck will change it to true and vice versa)
function toggleCheck(index) {

  //console.log(STORE[index]);
  STORE.items[index].checked = !STORE.items[index].checked;  
}


//DELETES ITEM FROM SHOPPING LIST--------------------------------------------------

function handleDeleteItemClicked() {

  $('.shopping-list').on('click','.js-item-delete', function(event){
    const itemIndex = $(this).closest('li').attr('data-item-index');
    STORE.items.splice(itemIndex,1);
    renderShoppingList();

  });

  console.log('`handleDeleteItemClicked` ran');

}



//When checkbox changes, update STORE property

function isChecked() {
  $('.switch').change(function() {
      console.log(STORE.showChecked);
      STORE.showChecked = !STORE.showChecked;
      console.log(STORE.showChecked);
      renderShoppingList();
      return;
  });
  
}



//EDITS NAME OF ITEM IN LIST--------------------------------------------------------

function editItem() {

}




/*************************HANDLING HTML*****************************/


//Generates EACH list items HTML
function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}



//PRODUCES FULL HTML STRING OF SHOPPING LIST------------------------

//Calls generateItemElement (generates one item at a time)
//      joins indidvidual items into full HTML string

//------------------------------------------------------------------

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join("");
}


//DELIVERS HTML TO DOM----------------------------------------------

//Calls generateShoppingItemsString to create full HTML for list

//------------------------------------------------------------------

function renderShoppingList() {
 
  console.log('`renderShoppingList` ran');

  let checkedListItems = [...STORE.items];
  
  if(!STORE.showChecked) {
    checkedListItems = checkedListItems.filter(item => item.checked === false); //checks if each item has checked === true property and stores in array
  }
  

  // insert that HTML into the DOM
  $('.js-shopping-list').html(generateShoppingItemsString(checkedListItems));
}



/**********************************************************************************/


//CALLBACK FUNCTION WHEN PAGE LOADS-------------------------------------------------

//Calls renderShoppingList to display HTML to DOM
//Calls handleNewItemSubmit to intake value inputted by user to our database
//Calls handleItemCheckClicked to toggle checked items from list
//Calls handleDeleteItemClicked to delete items from list

//----------------------------------------------------------------------------------

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  isChecked();
}

//When the page loads, calls handleShoppingList
$(handleShoppingList);
