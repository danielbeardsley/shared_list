Feature: Visiting the a list's page

	@no-txn @javascript
	Scenario: Visit an existing list's page
		Given a list: "my list" exists with title: "TITLE!"
		And the following items exist
			| title | list     |
			| Item1 | the list |
			| Item2 | the list |
		And I go to the list's page
			Then I should see "TITLE!" within "div.title"
			And the following items should be shown
			| item  |
			| Item1 |
			| Item2 |
