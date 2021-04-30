(function () {
'use strict';

var initialsItems = [
    {
        name: "cookies",
        quantity: 10
    },
    {
        name: "milk",
        quantity: 3,
    },
    {
        name: "donuts",
        quatity: 5
    },
    {
        name: "burgers",
        quantity: 6
    },
    {
        name: "water",
        quantity: 4
    }
]

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var list1 = this;

    list1.initialsItems = ShoppingListCheckOffService.getInitialsItems();

    list1.removeItem = function (itemIndex) {
        try{
            ShoppingListCheckOffService.removeItem(itemIndex);
        } catch(error) {
            list1.errorMessage = error.message;
        }
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list2 = this;

    list2.boughtItems = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
    var service = this;

    var initialItems = initialsItems;
    var boughtItems = [];

    service.removeItem = function (itemIndex) {
        var itemToAdd = {
            name: initialItems[itemIndex].name,
            quantity: initialItems[itemIndex].quantity
        };        
        if(boughtItems.length < 4) {
            boughtItems.push(itemToAdd);
            initialItems.splice(itemIndex,1);
        } else {
            boughtItems.push(itemToAdd);
            initialItems.splice(itemIndex,1);
            throw new Error("All items bought");
        }
    }

    service.getInitialsItems = function () {
        return initialItems;
    }

    service.getBoughtItems = function () {
        return boughtItems;
    }

}

})();