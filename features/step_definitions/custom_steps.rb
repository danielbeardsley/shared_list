Then(/^the "([^"]*)" field(?: within "([^"]*)")? should be (?:empty|blank)$/) do |field, selector|
	Then %Q{the "#{field}" field #{selector ? "within \"#{selector}\" " : ""}should not contain ".+"}
end
