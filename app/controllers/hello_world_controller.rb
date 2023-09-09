# frozen_string_literal: true
# defined hello world controller
# subclass < superclass
# ApplicationController class inherits functionality from ActionController::Base 

class HelloWorldController < ApplicationController
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger" }
  end
end
