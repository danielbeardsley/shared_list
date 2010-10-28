Then(/^the "([^"]*)" field(?: within "([^"]*)")? should be (?:empty|blank)$/) do |field, selector|
	Then %Q{the "#{field}" field #{selector ? "within \"#{selector}\" " : ""}should not contain ".+"}
end

Then(/^pause .*/) do
	debugger
end

Then(/^(only |)?the following items? should be shown:?$/) do |only, table|
	with_scope('.items_container') do
		field_values = all('input').map(&:value)
		expected_items = table.hashes.map{|attr| attr['item']}
		assert_equal(expected_items, field_values)
	end
end
