@javascript
Feature: Creating an item on a list

	Background:
		Given a list: "my list" exists


	Scenario: An item is added to an empty list
		When I go to the list's page
			And I send "Item Text" to ".items_container input"
			And I save the list and wait
		Then an item should exist with title: "Item Text"
			And that item should be in the list's items

  @current
	Scenario: multiple items are added to an empty list
		When I go to the list's page
			And I send "1", :enter to ".items_container input"
			And I type "2", :enter
			And I type "3"
		Then the active element should be ".items_container input:last"
			And the following items should be shown
				| 1 | 2 | 3 |
		
		When I save the list and wait
		Then the list should have the following items
			| 1 | 2 | 3 |


	Scenario: Visiting an empty list's page and clicking in/out of the input box should not save a blank item
		When I go to the list's page
			And I send " " to ".items_container input"
			And I save the list and wait
		Then the list should have 0 items


	Scenario: Adding an item in the middle of a list with the enter key
		When the following items exist
			| title | list     |
			| Item1 | the list |
			| Item2 | the list |
			And I go to the list's page
			And I send :end, :enter to ".items_container input"
		Then the following items should be shown
			| Item1 |      | Item2 |


	Scenario: Splitting an item in the with the enter key
		When the following items exist
			| title  | list     |
			| AABB | the list |
			And I go to the list's page
			And I send :home, :right, :right, :enter to ".items_container input"
		Then the following items should be shown
			| AA | BB |
			And the active element should be ".items_container input:last"
