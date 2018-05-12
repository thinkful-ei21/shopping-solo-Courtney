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



//Tried refactoring to make retrieveUserInput it's own function to be used by searchForItem and handleNewItemSubmit

// function retrieveUserInputFromForm(jQuerySelector) {
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


//updated version of handleNewItemSubmit

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


//Searches for item in STORE
function searchForItem() {

  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    if ($('.search').val() === '') return; //prevents user from being able to add empty item (ex: '')

    else {
      const searchingFor = $('.search').val();
      $('.search').val(''); //resets search bar
      
      //filter function
      //renderShoppingList(...searchStoreForList(searchingFor));
      const itemName = searchStoreForList(searchingFor);
      // console.log(itemName);
      // console.log(itemName === undefined);
      if (itemName === undefined) throw new Error('Item not in list');

      //console.log(generateItemElement(itemName, 0));
      $('.js-shopping-list').html(generateItemElement(itemName, 0));
    }
  });
}



function searchStoreForList(desiredItem) {

  // console.log(desiredItem);
  // console.log(STORE.items);
  // console.log(STORE.items.filter(item => item.name === desiredItem));

  const arrayOfItem = STORE.items.filter(item => item.name === desiredItem);
  //console.log(arrayOfItem);



  return arrayOfItem[0];
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



//Tried refactoring to have getItemIndex be it's own function

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


  //tried using .click shorthand instead of .on('click', etc) but couldn't get it to work...
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
      //console.log(STORE.showChecked);
      STORE.showChecked = !STORE.showChecked;
      //console.log(STORE.showChecked);
      renderShoppingList();
      return;
  });
  
}



//EDITS NAME OF ITEM IN LIST--------------------------------------------------------

function editItem() {

  $('.shopping-list').on('click', '.js-item-update', event => {
    const newName = $(this).closest('.shopping-item').val();
    console.log(newName);
  });



  // .keypress(event => {
  //   if (event.which === 13) {
  //     const updatedName = $('js-shopping-item').val();
  //     console.log(updatedName);
  //   } 
  // });
}






/*************************HANDLING HTML*****************************/


//Generates EACH list items HTML
function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}" contenteditable="true">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-update js-item-update">
            <span class="button-label">update name</span>
        </button>
      </div>
    </li>`;
}



//PRODUCES FULL HTML STRING OF SHOPPING LIST------------------------

//Calls generateItemElement (generates one item at a time)
//      joins indidvidual items into full HTML string

//------------------------------------------------------------------

function generateShoppingItemsString(shoppingList) {

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  //console.log(items);
  return items.join("");
}


//DELIVERS HTML TO DOM----------------------------------------------

//Calls generateShoppingItemsString to create full HTML for list

//------------------------------------------------------------------

function renderShoppingList(listItems = [...STORE.items]) {

  //let checkedListItems = [...STORE.items];
  
  if(!STORE.showChecked) {
    listItems = listItems.filter(item => item.checked === false); //checks if each item has checked === true property and stores in array
  }
  

  // insert that HTML into the DOM
  $('.js-shopping-list').html(generateShoppingItemsString(listItems));
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
  editItem();
  searchForItem();
}

//When the page loads, calls handleShoppingList
$(handleShoppingList);
