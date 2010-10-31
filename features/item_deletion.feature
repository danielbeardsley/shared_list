@javascript
Feature: Deleting an item from a list

	Background:
		Given a list: "my list" exists
			And the following items exist
				| title | list     |
				| Item1 | the list |
				| Item2 | the list |

	@current
	Scenario: An item is deleted via the 'delete' button on an empty line
		Given I am on the list's page
			And I send [:control, 'a'], :delete, :delete to ".items_container input:last"
			And I save the list and wait
		And the list should have the following items
			| Item1 |

	@current
	Scenario: An item is deleted via the 'delete' button on a non-empty line
		Given I am on the list's page
			And I send :end, :delete to ".items_container input:first"
			And I save the list and wait
		And the list should have the following items
			| Item1Item2 |
			And the following items should be shown
			| item  |
			| Item1Item2 |
