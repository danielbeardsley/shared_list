# Creation steps


# Assertion Steps
# assert exact items exist
Then(/^the #{capture_model} should have the following items?$/) do |model, table|
	record = find_model!(model)
	raise "this step only works on Lists, not #{record.class.name.pluralize}" if !(record.is_a? List)
	
	items = record.items.map(&:title)
	expected = table.raw.first
	assert_same_elements expected, items
end

require 'shoulda/assertions'
World(Shoulda::Assertions)
