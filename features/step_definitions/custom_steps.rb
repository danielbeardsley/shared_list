Then(/^debug.*/) do
	debugger
end

Given(/^(?:|I )wait (?:|for )(\d+|\d+\.\d+) seconds?$/) do |sec|
	sleep(sec.to_f)
end
