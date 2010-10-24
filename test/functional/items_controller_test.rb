require 'test_helper'

class ItemsControllerTest < ActionController::TestCase
  context "" do
    setup do
      @list = Factory(:list)
    end
    
    context "on POST to :create" do
      setup { post :create, :list_id => @list.id, :item => {:title => "Hello"} }
      
      should respond_with :success
      [:list, :item].each {|var| should assign_to(var) }
      
      should "create the correct item" do
        assert_equal 1, @list.items.count
        assert_equal "Hello", @list.items.first.title
      end
    end
    
    context "on PUT to :update" do
      setup {
        @item = @list.items.create(:title => "Original")
        put :update,
          :list_id => @list.id,
          :id => @item.id,
          :item => {:title => "Modified"}
      }
      
      should respond_with :success
      [:list, :item].each {|var| should assign_to(var) }
      
      should "update the item" do
        assert_equal 1, @list.items.count
        assert_equal "Modified", @list.items.first.title
      end
    end     
  end
end
