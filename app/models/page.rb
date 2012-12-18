class Page < ActiveRecord::Base
  attr_accessible :url 
  attr_accessor :vote

  validates :url, :presence => true

  def initialize(params = {}, options={})
    super
    self.foo_count = 0
    self.baz_count = 0
  end

  def register_vote(vote)
    if vote == 'Foo'
      self.foo_count += 1
    elsif vote == 'Baz'
      self.baz_count += 1
    end
  end

end
