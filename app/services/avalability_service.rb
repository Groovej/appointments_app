class AvalabilityService
  def initialize(kwargs = {})
    @user = kwargs[:user]
    @coach = kwargs[:coach]
    @datetime = DateTime.parse(kwargs[:datetime])
    @duration = kwargs[:duration]
  end

  def call
    !(check_user_avalability || check_coach_avalability)
  end

  private

  def check_user_avalability
    user_appointments = @user.imcoming_appointments
    check_for_intersection(user_appointments) unless user_appointments.empty?
  end

  def check_coach_avalability
    coach_incomming_appointments = User.find_by(hash_id: @coach).planed_appointments

    check_for_intersection(coach_incomming_appointments) unless coach_incomming_appointments.empty?
  end

  def check_for_intersection(data)
    data.any? do |appointment|
      appointment_range = appointment.start.to_i..(appointment.start + appointment.duration.minutes).to_i
      incomming_range = @datetime.to_i..(@datetime + @duration.minutes).to_i
      appointment_range.overlaps?(incomming_range)
    end
  end
end
