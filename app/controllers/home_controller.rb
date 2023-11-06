class HomeController < ApplicationController
  before_action :check_authentication, only: :sign_in
  before_action :verify_coach_id, only: :create
  before_action :authenticate_user!, except: [:sign_in]

  def index
    render 'shared'
  end

  def sign_in
    render 'shared'
  end

  def create
    is_available_to_book = AvalabilityService.new({
      user: current_user,
      coach: permitted_params[:coach_id],
      datetime: permitted_params[:datetime],
      duration: permitted_params[:duration].to_i,
    }).call()

    if is_available_to_book
      appointment = Timetable.create(
        coach_hash_id: permitted_params[:coach_id],
        client_hash_id: current_user.hash_id,
        start: permitted_params[:datetime],
        duration: permitted_params[:duration].to_i
      )
      render json: { success: true, appointment: appointment }
    else
      render json: { success: false }, status: 422
    end
  end

  def imcoming
    render json: {
      data: current_user.imcoming_appointments,
      coaches: User.where(role: 'coach').select(:hash_id, :first_name, :last_name)
    }
  end

  def user
    render json: {
      user: {
        firstName: current_user.first_name,
        lastName: current_user.last_name,
        role: current_user.role
      }
    }
  end

  def coaches
    render json: {
      coaches: User.where(role: 'coach').where.not(hash_id: current_user.hash_id).select(:hash_id, :first_name, :last_name)
    }
  end

  private

  def permitted_params
    params.require(:appointment).permit(:coach_id, :datetime, :duration)
  end

  def check_authentication
    return if request.env['PATH_INFO'] == '/sign_in'

    redirect_to sign_in_path unless current_user
    redirect_to dashboard_path if current_user
  end

  def verify_coach_id
    coach = User.where(hash_id: permitted_params[:coach_id], role: 'coach').first
    render json: { success: false }, status: 422 and return unless coach
  end
end
