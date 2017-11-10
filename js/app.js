//app is defined as a separate module called "GroceryListApp" 
var app = angular.module('groceryListApp', ["ngRoute"]);

// routing configuration object
app.config(function($routeProvider){
  //$locationProvider.hashPrefix(''); 
  $routeProvider
      .when("/",{ /* this is the main page of the app where the main grocery list is seen */ 
          templateUrl: "partials/groceryList.html",
          controller: "HomeController"
      })
      .when("/addItem",{ //this is the page where a grocery item can be added (addItem.html) -->
          templateUrl: "partials/addItem.html",
          controller: "GroceryListItemController"
      })
      /* Route parameters are especially important when deleting or updating an    item that might have more than one ppiece of information to update.       The route param item will pass a parameter of "/:id" (or whatever is      put into the path after : ) to the controller,                            GroceryListItemController.             
         The /:id might be used to identify a specific item on the grocery list to edit.   
         If route parameters are used, another dependency, $routeParams, has to be injected into the controller that uses the route params.  In this case, it's the GroceryListItemController. */ 
      .when("/addItem/edit/:id", {/* This route is only used when a particular item is being edited. */
        templateUrl: "partials/addItem.html",
        controller: "GroceryListItemController"
      })
      .otherwise ({
          redirectTo: "/" // this is the main grocery list page
      })
});

/* Creating a SERVICE called GroceryService for the controllers to use. 
   The grocery items list will be passed into the GroceryListItemController that needs access to the list via route params. */
app.service("GroceryService", function(){
      //create an empty object literal
      var groceryService = {};

      /* Using object dot.notation: object.object property = the items in the array of objects from the GroceryListItemController. */
      groceryService.groceryItems =  [
        { id: 1, completed: true, itemName: 'milk', date: new Date ("October 1, 2017 11:13:00")}, 
        { id: 2, completed: true, itemName: 'cookies', date: new Date ("October 2, 2017 10:15:00")},
        { id: 3, completed: true, itemName: 'ice cream', date: new Date ("October 2, 2017 11:13:00")},
        { id: 4, completed: true, itemName: 'potatoes', date: new Date ("October 4, 2017 08:20:00")},
        { id: 5, completed: true, itemName: 'cereal', date: new Date ("October 4, 2017 11:13:00")},
        { id: 6, completed: true, itemName: 'bread', date: new Date ("October 8, 2017 11:13:00")},
        { id: 7, completed: true, itemName: 'eggs', date: new Date ("October 9, 2017 11:13:00")},
        { id: 8, completed: true, itemName: 'tortillas', date: new Date ("October 12, 2017 11:13:00")}
        ];
    
    //Function to find an item to edit by it's ID.
    /* This function will perform a for each loop through all the items checking each id to see if it matches the id passed into the function. If it is a match, the object associated with the id is returned. */
     groceryService.findById = function (id) {
        for(var item in groceryService.groceryItems) {
          if(groceryService.groceryItems[item].id === id) {
              console.log(groceryService.groceryItems[item]);
              return groceryService.groceryItems[item];
          }
        }
     };

    // Function to create a unique ID for each grocery item
      groceryService.getNewId = function() {
        // If there is a variable, newId, then increase the newId by 1  increase it by 1
          if(groceryService.newId) {
              groceryService.newId++;
              return groceryService.newId;
            } else { // it there is not a variable newId, create it
               /* The function to create a newId is taken from the underscore.js library. The function looks at all the ids in the groceryService.groceryItems array. It finds the max id (the largest number). It then creates a newId by adding 1 to the highest id in the array, which becomes the newId. */
                    var maxId = _.max(groceryService.groceryItems, function(entry) {
                        return entry.id;
                      })
                      groceryService.newId = maxId.id + 1;
                     return groceryService.newId;
            }
        };
  
  // removeItem function that was called in the controller
    groceryService.removeItem = function (entry) {
        /* using the indexOf function gets the index of whatever is passed in (entry). If it matches anything in the array, it will get the index of the matching item. */
        var index = groceryService.groceryItems.indexOf();
        
        /* The splice function goes to the array and start at the first parameter in the parens, which is index. So, start at whatever the indexOf returns from the previous line of code. The second parameter,1, indicates where to stop slicing. Starting at index, splice 1 item, and stop slpicing. */  
        groceryService.groceryItems.splice(index,1);
    };

      /* This is the save()function that is called in the GroceryListItemController as  $scope.save = function()... (line 121). 
      It takes an entry, GroceryService.save($scope.groceryItem); from the save function and pushes it to the groceryService.groceryItems array. 
      When the save () function is called, it gets the entry's id by the newId generated by the .getNewId () function. */
    groceryService.save = function (entry) {
      var updatedItem = groceryService.findById(entry.id);
        if (updatedItem) { /* if an entry was found to update, then update the following: */
            updatedItem.completed = entry.completed;
            updatedItem.itemName = entry.itemName;
            updatedItem.date = entry.date;
          } else {
            entry.id = groceryService.getNewId();
            groceryService.groceryItems.push(entry);
          }
      };    
      // return the object that was created on line 32. 
      return groceryService;
  });

// first Controller named "HomeController"
// controls the body of the app in the  index.html file
// the variable appTitle is set to "Grocery List", the name of the app. 
// The GroceryService is passed into this controller for it to use.
app.controller("HomeController",["$scope","GroceryService", function ($scope, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems;

    // function to remove item from grocery list
    $scope.removeItem = function(entry) {
      GroceryService.removeItem(entry); /* this function has to be defined in the GreoceryService */
    }
  }]);

// second controller - called "GroceryListItemController"
// Handles all the interaction with the grocery list items
/* In order for the GroceryService to pass the grocery list items into the GroceryListItemController, another parameter of "GroceryService" has to be added to the controller inside the [] AND within the function parameters. */ 
app.controller("GroceryListItemController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService) { 
      if (!$routeParams.id) { /* This says:If $routeParams.id is NOT null,then a new entry will be created. Put another way: if there is no id in the URL,then a new entry will be created. */
              $scope.groceryItem = {id: 0, completed: false, itemName: "", date: new Date()};
        } else {
         // This is another function supplied by the underscore.js library 
          $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id))); 
          /* Sometimes $routeParams wants to pass the id as a string. To insure that it is passed as an integer, parseInt should be used with $routeParams.id. This guarantees that any string will be parsed and passed as an integer.  */
        }
    
    // The save function on addItem.html
    // The logic in the function will be linked to the GroceryService
    $scope.save = function() {
        /* This says to go to the GroceryService and use the save() function there with this particular parameter passed into the function, which is the $scope.groceryItem from line 112. */
        GroceryService.save($scope.groceryItem);

        /* Now, the $location service is used to direct the flow of code back to the grocery list. */
        $location.path("/");
    };
   
}]);