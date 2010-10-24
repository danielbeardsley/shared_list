require 'test_helper'

class ItemsControllerTest < ActionController::TestCase
  context "" do
    setup do
      @list = Factory(:list)
    end
    
    context "on PUT to :create" do
      setup { put :create, :list_id => @list.id, :item => {:title => "Hello"} }
      
      should respond_with :success
      [:list, :item].each {|var| should assign_to(var) }
      
      should "create the correct item" do
        assert_equal 1, @list.items.count
        assert_equal "Hello", @list.items.first.title
      end
    end    
  end
end
