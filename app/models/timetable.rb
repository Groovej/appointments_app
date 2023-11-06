class Timetable < ApplicationRecord
  belongs_to :user, foreign_key: :client_hash_id

  validates_presence_of :coach_hash_id, :client_hash_id, :start, :duration
end
