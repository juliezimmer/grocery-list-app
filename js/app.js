//app is defined as a separate module called "GroceryListApp" 
var app = angular.module('groceryListApp', ["ngRoute"]);

// routing configuration object
app.config(function($routeProvider){
  //$locationProvider.hashPrefix(''); 
  $routeProvider
      .when("/",{ /* this is the main page of the app where the main grocery list is seen */ 
          templateUrl: "partials/groceryList.html",
          controller: "GroceryListItemsController"
      })
      .when("/addItem",{ //this is the page where a grocery item can be added (addItem.html) -->
          templateUrl: "partials/addItem.html",
          controller: "GroceryListItemsController"
      })
      /* Route parameters are especially important when deleting or updating an    item that might have more than one ppiece of information to update.       The route param item will pass a parameter of "/:id" (or whatever is      put into the path after : ) to the controller,                            GroceryListItemsController.             
         The /:id might be used to identify a specific item on the grocery list to edit.   
         If route parameters are used, another dependency, $routeParams, has to be injected into the controller that uses the route params.  In this case, it's the GroceryListItemsController. */ 
      .when("/addItem/:mushroom/:vegetables", { 
        templateUrl: "partials/addItem.html",
        controller: "GroceryListItemsController"
      })
      .otherwise ({
          redirectTo: "/" // this is the main grocery list page
      })
});

/* Creating a SERVICE for the controllers to use that has the names of all the grocery items in it. 
The grocery items list will be passed into the GroceryListItemsController that needs access to the list via route params. */
app.service("GroceryService", function(){
      //create an empty object literal
      var groceryService = {};

      // There will be one item or property in the object.
      /* Using object dot.notation: object.object property = the items in the array of objects from the GroceryListItemsController. */
      groceryService.groceryItems =  [
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
    ];
    /* Now, return the object that was created in the GroceryService on line 35. */
    return groceryService;
});




// first Controller named "HomeController"
// controls the body of the app in the  index.html file
// the variable appTitle is set to "Grocery List", the name of the app. 
// The GroceryService is passed into this controller for it to use.
app.controller("HomeController",["$scope","GroceryService", function ($scope, GroceryService) {
    
    $scope.appTitle = GroceryService.groceryItems[0].itemName; 

    /* This will pull the name of the first item our of the GroceryService.groceryItems array in the GroceryService above. */    //GroceryService.groceryItems[0].itemName;
}]);

// second controller - called "GroceryListItemsController"
// Handles all the interaction with the grocery list items
/* In order for the GroceryService to pass the grocery list items into the GroceryListItemsController, another parameter of "GroceryService" has to be added to the controller inside the [] AND within the function parameters. */ 
app.controller("GroceryListItemsController", ["$scope", "$routeParams", "GroceryService", function($scope, $routeParams, GroceryService) { 
    
  $scope.groceryItems = GroceryService.groceryItems; /* Note that GroceryService.groceryItems is defined in the service as an arry of objects that are the grocery items. */ 

    $scope.rp = "Route Parameter Value: " + $routeParams.id; 
}]);