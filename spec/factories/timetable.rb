FactoryBot.define do
  factory :timetable do
    duration { 45 }
    start { Faker::Time.between(from: DateTime.now, to: DateTime.now + 2.days) }
  end
end
