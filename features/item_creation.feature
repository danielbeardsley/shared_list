Feature: Creating a item on a list

	@javascript
	Scenario: An item is added to an empty list using the enter key
		Given a list: "my list" exists
		And I am on the list's page
		And I send "Item Text" to ".items_container input"
		And I click somewhere else
		And I wait for 1 second
			Then an item should exist with title: "Item Text"
			And that item should be in the list's items
