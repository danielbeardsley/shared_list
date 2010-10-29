Feature: Creating a item on a list

	Background:
		Given a list: "my list" exists

	@javascript
	Scenario: An item is added to an empty list using the enter key
		And I am on the list's page
		And I send "Item Text" to ".items_container input"
		And I click somewhere else
		And I wait for 1 second
			Then an item should exist with title: "Item Text"
			And that item should be in the list's items

	@javascript
	Scenario: Visiting an empty list's page and clicking in/out of the input box
		When I go to the list's page
			And I send " " to ".items_container input"
			And I click somewhere else
			And I wait 1 second
		Then the list should have 0 items
