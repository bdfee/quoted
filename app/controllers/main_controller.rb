# frozen_string_literal: true

# defined hello world controller
# subclass < superclass
# ApplicationController class inherits functionality from ActionController::Base

class MainController < ApplicationController
  layout 'base'

  def index; end
end
