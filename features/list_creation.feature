Feature: Creating a task list

	Scenario: A new user creates a list
		When I go to the home page
			Then I should see "New List" within "a"
