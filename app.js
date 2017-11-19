// xBudget App - The Expense Tracker

console.log('wroking');


// Budget Controller.

var bugetController = (function() {
	
	//
					
	
})();


// UI Controller.

var UIController = (function () {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
		
	}

return {
	getInput: function() {
		return {
		type: document.querySelector(DOMstrings.inputType).value, // either Inc or Exp
		description: document.querySelector(DOMstrings.inputDescription).value,
		value: document.querySelector(DOMstrings.inputValue).value 	
			  };
		},
	
		getDOMstrings: function() {
		 return DOMstrings;
		}
	};
		
})();


// Global App Controller

var controller = (function(budgetCtrl, UIctrl) {
	
	var setupEventListeners = function() 
	{
		var DOM = UIctrl.getDOMstrings();
		
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
	
		document.addEventListener('keypress', function(event) {
		
		if(event.keyCode === 13 || event.which === 13) {
		
			ctrlAddItem();
		}
		
	});
		
};

	
	
	var ctrlAddItem = function() {
		
		
		// 1. Getting the input data in the text box.
		
		var input = UIctrl.getInput();
		var op = UIctrl.getDOMstrings();
		console.info(input);
		
		// 2. Add the item to the budget controller .
		
		
		
		// 3.Add the Item to the UI.
		
		
		
		// 4. Calculate the budget.
		
		
		// 5. Display the budget on the UI.
		
		console.log('Enter key');
	};
	return {
		init: function() {
			console.info('App Intialization has started.');
			setupEventListeners();
		}
	};
	
})(bugetController, UIController);

controller.init();





