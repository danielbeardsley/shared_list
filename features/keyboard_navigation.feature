@javascript
Feature: Keyboard up and down arrows should move input focus between items

	Background:
		Given a list: "my list" exists
			And the following items exist
				| title | list     |
				| Item1 | the list |
				| Item2 | the list |
      And I go to the list's page


	Scenario: Moving down the list using the down arrow key
		When I click ".items_container input:first"
      And I type :down
		Then the active element should be ".items_container > input:last"

    When I type :down
		Then the active element should be ".items_container > input:last"


	Scenario: Moving up the list using the up arrow key
		When I click ".items_container input:last"
      And I type :up
		Then the active element should be ".items_container > input:first"

    When I type :up
		Then the active element should be ".items_container > input:first"
