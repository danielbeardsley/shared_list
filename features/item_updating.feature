@javascript
Feature: Updating an existing item

	Background:
		Given a list: "my list" exists

	Scenario: An item is added to an empty list
		When I go to the list's page
			And I send "one" to ".items_container input"
			And I save the list and wait
			And I send " two" to ".items_container input"
			And I save the list and wait
		Then the list should have 1 items      
			And an item should exist with title: "one two"
