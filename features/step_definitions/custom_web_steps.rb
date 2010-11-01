# Assertion steps

Then(/^the "([^"]*)" field(?: within "([^"]*)")? should be (?:empty|blank)$/) do |field, selector|
	Then %Q{the "#{field}" field #{selector ? "within \"#{selector}\" " : ""}should not contain ".+"}
end

Then(/^(?:|I )should see (\d+) elements? matching "([^"]*)"$/) do |quantity, selector|
  assert_equal quantity.to_i, all(selector).length
end


# Interaction steps

When(/^(?:|I )click "([^"]*)"$/) do |selector|
	msg = "No element found using selector '#{selector}'"
	find(selector, :message => msg).click
end

Given(/^(?:|I )click somewhere else$/) do
	find('body').click
end

When(/^(?:|I )save the list(?: and (wait))?$/) do |wait|
	Then "I click somewhere else"
	Then "I wait 1 second" if wait
end

# Steps specific to certain layouts

Then(/^(only |)?the following items? should be shown:?$/) do |only, table|
	with_scope('.items_container') do
		field_values = all('input').map(&:value)
		expected_items = table.raw[0]
		assert_equal(expected_items, field_values)
	end
end
