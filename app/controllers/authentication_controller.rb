class AuthenticationController < ApplicationController
  respond_to :json

  def create
    resource = User.find_for_database_authentication(email: permitted_params[:email])
    return login_failed unless resource

    if resource.valid_password?(permitted_params[:password])
      sign_in(:user, resource)
      render json: { success: true, user: { firstName: resource.first_name, lastName: resource.last_name } }
      return
    end

    login_failed
  end

  def destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    render json: { success: true }
  end

  protected

  def permitted_params
    params.require(:user).permit(:email, :password)
  end

  def login_failed
    render json: { success: false, errors: "Login Failed" }, status: 401
  end
end
