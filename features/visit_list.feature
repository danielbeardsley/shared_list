Feature: Visiting the a list's page

	Scenario: Visit an existing list's page
		Given a list: "my list" exists with title: "TITLE!"
		And the following items exist
			| title | list     |
			| Item1 | the list |
			| Item2 | the list |
		And I go to the list's page
			Then I should see "TITLE!" within "div.title"
			And the "item_0" field should contain "Item1"
			And the "item_1" field should contain "Item2"
			And the "new_item" field should be empty
