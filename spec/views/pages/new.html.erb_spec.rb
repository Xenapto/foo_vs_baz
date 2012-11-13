require 'spec_helper'

describe "pages/new" do
  before(:each) do
    assign(:page, stub_model(Page,
      :url => "MyString",
      :foo_count => 1,
      :baz_count => 1
    ).as_new_record)
  end

  it "renders new page form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => pages_path, :method => "post" do
      assert_select "input#page_url", :name => "page[url]"
      assert_select "input#page_foo_count", :name => "page[foo_count]"
      assert_select "input#page_baz_count", :name => "page[baz_count]"
    end
  end
end
