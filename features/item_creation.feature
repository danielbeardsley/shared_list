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


	Scenario: Visiting an empty list's page and clicking in/out of the input box
		When I go to the list's page
			And I send " " to ".items_container input"
			And I save the list and wait
		Then the list should have 0 items

	@current
	Scenario: Adding an item in the middle of a list with the enter key
		When the following items exist
			| title | list     |
			| Item1 | the list |
			| Item2 | the list |
			And I go to the list's page
			And I send :end, :enter to ".items_container input"
		Then the following items should be shown
			| Item1 |      | Item2 |
