//app is defined as a separate module called "GroceryListApp" 
var app = angular.module('groceryListApp', []);

// first Controller named "HomeController"
// controls the body of the app in the  index.html file
// the variable appTitle is set to "Grocery List" , which is the name of the app 
app.controller("HomeController",["$scope", function($scope){
    $scope.appTitle = "Grocery List";
}]);

// second controller
// called "GroceryListItemsController"
/* controls the main container, which handles all the interaction with the grocery list item */
// contains a variable, groceryItems, which is an array of grocery item objects
/* Each item/object in the array contains;
    completed: a boolean (true or false), 
    itemName: name of item,
    date: date the item was created
*/ 
app.controller("GroceryListItemsController", ["$scope", function($scope) {
    
  $scope.groceryItems = [ 
    // an array of grocery items that were/are on the list app 
      {
        completed: true, 
        itemName: 'milk', 
        date: '2014-10-01' // date will be used to sort the list items
      },
      {
        completed: true, 
        itemName: 'cookies', 
        date: '2014-10-01'
      },
      {
        completed: true, 
        itemName: 'ice cream', 
        date: '2014-10-02'
      },
      {
        completed: true, 
        itemName: 'potatoes', 
        date: '2014-10-02'
      },  
      {
        completed: true, 
        itemName: 'cereal', 
        date: '2014-10-03'
      },
      {
        completed: true, 
        itemName: 'bread', 
        date: '2014-10-03'
      },
      {
        completed: true, 
        itemName: 'eggs', 
        date: '2014-10-04'
      },
      {
        completed: true, 
        itemName: 'tortillas', 
        date: '2014-10-04'
      }
  ]
}]);