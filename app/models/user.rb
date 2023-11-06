class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable

  self.primary_key = :hash_id

  enum role: { client: 'client', coach: 'coach' }

  has_many :timetables, foreign_key: :client_hash_id

  validates_presence_of :hash_id, :role, :email, :first_name, :last_name

  def imcoming_appointments
    self.timetables.where("start >= ?", Time.now.at_beginning_of_day).select(:coach_hash_id, :start, :duration)
  end

  def planed_appointments
    Timetable.where("start >= ?", Time.now.at_beginning_of_day).where(coach_hash_id: self.hash_id)
  end
end
