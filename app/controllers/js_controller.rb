class JsController < ApplicationController
  def index
    render params[:file]
  end
end
