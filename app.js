// xBudget App - The Expense Tracker


// Budget Controller.

var bugetController = (function() {
	
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.precentage = -1;
	};
	
	Expense.prototype.calcPercentage = function(totalIncome){
		if(totalIncome>0){
		this.percentage = Math.round(this.value / totalIncome *100);
						}
		else {
		this.percentage = -1;
			}
		
		};
	Expense.prototype.getPercentage = function(){
			return this.percentage;
		
	};
	
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var calculateTotal = function(type) {
		
		var sum = 0;
		data.allItems[type].forEach(function(curr){
		
			sum += (curr.value);	
		
		});
		data.totals[type] = sum;		
	}
					
// creating a custom DS to store the Exp / Income with two properties :

	var data = {
		allItems: {
					exp: [],
					inc: []
					},
		  totals: {
					exp: 0,
					inc: 0
					},
		  budget: 0,
		
	  percentage: -1
		
};

	return {
		addItem: function(type, des, val) {
			var newItem;
			
			 // Creating new ID for the elements.
			
			// if the current array is zero then we need to check the length it must be >0 to avoid any type of error.
			if(data.allItems[type].length > 0)
				{
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
				}
			else {
				ID = 0;
			}

			// Create new item based on 'inc' or 'exp' type.
			if(type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val);
			}
			// pushing the data in our DS.
			data.allItems[type].push(newItem);
			
			// Returning the new element.
			return newItem;
					
		},
		
		deleteItem: function(type, id) {
		var ids, index;
			
			// map returns an array.so with the ids 
		var ids = data.allItems[type].map(function(current) {
			console.log(ids); 
			
			return current.id;
			
			console.log("Index" + index);
			});	
			index=ids.indexOf(id);
			
			// -1 index signifies no element in the array. 
			
		if(index!== -1){
			data.allItems[type].splice(index, 1);
		}
		},
		
		
		calculateBudget: function() {
		
			//calculating total income and expense
			calculateTotal('exp');
			calculateTotal('inc');
			
			
			// calculate the budget " Income / Expense
			
			data.budget = data.totals.inc - data.totals.exp;
			
			
			// Calculate the percentage of income that we spent.
		
			if(data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			}
			else {
				data.percentage = -1;
			}
			
		},
		
		calculatePercentages: function() {
		/*
		a=20;
		b=10;
		c=40;
		income=100;
		a=20/100,b=10/100,c=40/100;
		*/
			data.allItems.exp.forEach(function(cur){
				
				cur.calcPercentage(data.totals.inc);
			});
			
		},
		getPercentages: function() {
			
			var allPerc = data.allItems.exp.map(function(cur){
				return cur.getPercentage();
			});
			return allPerc;
			
		},
		
		
		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
			
		},
		
		testing: function() {
			console.log(data);
		}
	};	
})();



// UI Controller.

var UIController = (function () {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',	
		container: '.container'
	};

return {
	getInput: function() {
		return {
		type: document.querySelector(DOMstrings.inputType).value, // either Inc or Exp
		description: document.querySelector(DOMstrings.inputDescription).value,
		value: parseFloat(document.querySelector(DOMstrings.inputValue).value)	
			  };
		},
	
		addListItem: function(obj, type) {
		
		var html, newHtml, element;
		
		// Creating HTML string with placeholders text.
		if (type === 'inc') {
			element = DOMstrings.incomeContainer;
			html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
		}
		else if (type === 'exp') {
			element = DOMstrings.expensesContainer;
		html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
		}
		
		// Replacing the placeholder text with some actual data.
		
		newHtml = html.replace('%id%', obj.id);
		newHtml = newHtml.replace('%description%', obj.description);
		newHtml = newHtml.replace('%value%', obj.value);
		 
		
		// Inserting HTML Data into the DOM.
		
		document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
		
	},
	
	deleteListItem: function(selectorId) {
		// Here I am just just deleting the node by using selectorID.
		var el = document.getElementById(selectorId);
		el.parentNode.removeChild(el);
		
	},
	
	clearFields: function() {
		var fields, fieldsArr;
		
		fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);	
		
		// filelds var will return list on which push is not not applicable coz it works  only on array , so we are using array prototype to trick the list as array.
		fieldsArr = Array.prototype.slice.call(fields);
		
		// Iterating the array using foreach to clear the fields.
		fieldsArr.forEach(function (current, index, array) {
			current.value = "";
		});
		
		// After pushing the data the focus on the current desc field . to enhance the UX
		fieldsArr[0].focus();
		
	},
	
	displayBudget: function(obj) {
		
		document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
		document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
		document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
		if(obj.percentage > 0) {
		document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
		}
		else {
			document.querySelector(DOMstrings.percentageLabel).textContent = '-';
			document.querySelector(DOMstrings.percentageLabel).textContent = '-';
		}
		
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
		// Assigning here the HTML delegation to the parent node as on container so that we can assign the event node on any of the child node that will generate dynamically through adding the expense or Income.
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

		
};

	var updateBudget = function() {
	
		// 1. Calculate the budget.
		
		budgetCtrl.calculateBudget();
		
		
		// 2. Return the budget.
		var budget = budgetCtrl.getBudget();
		console.log(budget);
		
		// 3. Display the budget on the UI.
	
		UIctrl.displayBudget(budget);
		
	};
	
	var updatePercentage = function(){
	
		// calculate percentage
		
		budgetCtrl.calculatePercentages();
		
		// Read percentages from the budget controller
		
		var percentages = budgetCtrl.getPercentages();
		// update the UI with the new percentage.
		
		console.log(percentages);
		
	};
	
	var ctrlAddItem = function() {
		
		var input, newItem;
		
		// 1. Getting the input data in the text box.
		
		input = UIctrl.getInput();
		//var op = UIctrl.getDOMstrings();
		
		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
		
		
		// 2. Add the item to the budget controller .
		
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		// 3.Add the Item to the UI.
		
		UIctrl.addListItem(newItem, input.type);
			console.log(newItem);
		
		// 4. Clear the fields.
		UIctrl.clearFields();
		
		// 5. Calculate and update budget.
		
		updateBudget();
			
			// 6. cal and update the percentage.
			updatePercentage();
		
	}
		else {
			alert("Please fill all fields");
		}
		
		
	
	};
	
	var ctrlDeleteItem = function(event) {
		
		// I am extracting the parent node name from the html nodes and storing them.
	
		var itemID, splitID, type, ID;
		//.parentnode is used to travese one node up in the html file
		console.log(event.target);
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if(itemID) {
			
			// format is inc-1 or exp-1.
			splitID = itemID.split('-');
			
			// after splitting it will return the array of splillted string
			
			type = splitID[0];
			ID = parseInt(splitID[1]);
			
			// 1. Deleting the item fromt the DS.
			
			budgetCtrl.deleteItem(type, ID);
			
			
			// 2. Delete the item from the UI.
			
			UIctrl.deleteListItem(itemID);
			
			
			
			// 3. Update and show the new budget.
			
			updateBudget();
			
			// 4. cal and update the percentage.
			updatePercentage();
		 	
		}
		
	};
	
	
	return {
		init: function() {
// for wall paper.			var rnum = Math.floor(Math.random() * 4) + 1;
			
			// to reset the values of the fields on relod or new page.
			UIctrl.displayBudget( {
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListeners();
		}
	}; 
	
})(bugetController, UIController);

controller.init();





