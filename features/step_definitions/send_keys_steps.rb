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
  find(element).node.send_keys(*eval("[#{keys}]"))
end
