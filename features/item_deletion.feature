@javascript
Feature: Deleting an item from a list

	Background:
		Given a list: "my list" exists
			And the following items exist
				| title | list     |
				| Item1 | the list |
				| Item2 | the list |


	Scenario: An item is deleted via the 'delete' button on an empty line
		Given I am on the list's page
			And I send [:control, 'a'], :delete, :delete to ".items_container input:last"
			And I save the list and wait
		Then the list should have the following items
			| Item1 |
			And the following items should be shown
				| Item1 |


	Scenario: An item is deleted via the 'delete' button on a non-empty line
		Given I am on the list's page
			And I send :end, :delete to ".items_container input:first"
			And I save the list and wait
		Then the list should have the following items
			| Item1Item2 |
			And the following items should be shown
				| Item1Item2 |


	Scenario: An item is deleted via the 'backspace' button on an empty line
		Given I am on the list's page
			And I send [:control, 'a'], :delete, :backspace to ".items_container input:last"
			And I save the list and wait
		Then the list should have the following items
			| Item1 |
			And the following items should be shown
				| Item1 |


	Scenario: An item is deleted via the 'backspace' button at the beginning of a non-empty line
		Given I am on the list's page
			And I send :home, :backspace to ".items_container input:last"
			And I save the list and wait
		Then the list should have the following items
			| Item1Item2 |
			And the following items should be shown
				| Item1Item2 |
								
