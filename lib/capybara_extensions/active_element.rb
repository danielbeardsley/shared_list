if defined? Capybara
  module Capybara
    class Capybara::Driver::Base
      def active_element
        raise Capybara::NotSupportedByDriverError
      end
    end
    
    
    class Capybara::Driver::Selenium < Capybara::Driver::Base
        
      def active_element
        if bridge.respond_to?(:getActiveElement)
          element = bridge.getActiveElement
          Node.new(self, element) if element
        end
      end
      
    private
    
      def bridge
        @bridge ||= browser.send(:bridge)
      end
    end
  end
end
