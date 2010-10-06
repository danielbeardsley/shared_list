Feature: Creating a task list

	Scenario: A new user creates a list
		When I go to the home page
		And I press "New List"
			Then a list should exist
			And I should be on the list's page
