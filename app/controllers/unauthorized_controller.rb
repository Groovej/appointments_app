class UnauthorizedController < ApplicationController
  def index
    redirect_to sign_in_path
  end
end
