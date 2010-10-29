Feature: Visiting a list's page


	Background:
		Given a list: "my list" exists with title: "TITLE!"
		
	@javascript
	Scenario: Visit the page of a list that has several items
		When the following items exist
			| title | list     |
			| Item1 | the list |
			| Item2 | the list |
			And I go to the list's page
		Then I should see "TITLE!" within "div.title"
			And the following items should be shown
			| item  |
			| Item1 |
			| Item2 |

	@javascript
	Scenario: Visiting an empty list's page
		When I go to the list's page
		Then I should see 1 element matching ".items_container input"
