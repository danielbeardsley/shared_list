## Possible Keys
# :null, :cancel, :help, :backspace, :tab, :clear, :return, :enter, :shift, :left_shift, :control, :left_control :alt, :left_alt, :pause,
# :escape, :space:page_up, :page_down, :end, :home, :left, :arrow_left, :up:arrow_up, :right, :arrow_right:down, :arrow_down, :insert,
# :delete, :semicolon, :equals, :numpad0, :numpad1, :numpad2, :numpad3, :numpad4, :numpad5, :numpad6, :numpad7, :numpad8, :numpad9,
# :multiply, :add, :separator, :subtract, :decimal, :divide
#

# And I send "hello" to "#element"
# ... "hello", :delete to "#element"
# ... [:shift, 'a'] to "#element"
# ... "hello world", [:control, :left], "dumb " to "#element"
And(/^I send (.*) to "(.*)"$/) do |keys, element|
  find(element).native.send_keys(*eval("[#{keys}]"))
end

And(/^I type (.*)$/) do |keys|
  element = page.driver.active_element
  element.native.send_keys(*eval("[#{keys}]")) if element
end

Then(/^the active element should be "(.*)"$/) do |selector|
  element = page.driver.active_element
  expected = find(selector)
  assert_not_nil expected
  assert_equal expected.native, element.native
end
