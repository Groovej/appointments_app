client = User.create!(
  email: 'client123@empty.com',
  password: '1111111',
  password_confirmation: '1111111',
  first_name: 'John',
  last_name: 'Doe',
  role: 'client',
  hash_id: 'ves4D97csyi1x'
)

coach1 = User.create!(
  email: 'coach111@empty.com',
  first_name: 'Mike',
  last_name: 'Smith',
  password: 'coach111',
  password_confirmation: 'coach111',
  role: 'coach',
  hash_id: '3B4D97csyi1x'
)

# to have an ability to schedule session with other coaches
coach2 = User.create!(
  email: 'coach222@empty.com',
  first_name: 'Bruce',
  last_name: 'Wayne',
  password: 'coach222',
  password_confirmation: 'coach222',
  role: 'coach',
  hash_id: 'qmw4D97csyi1x'
)

coach3 = User.create(
  email: 'coach333@empty.com',
  password: 'coach333',
  first_name: 'Steeve',
  last_name: 'Anderson',
  password_confirmation: 'coach333',
  role: 'coach',
  hash_id: 'dreB4D34csyi3'
)

Timetable.create!(
  coach_hash_id: coach1.hash_id,
  client_hash_id: client.hash_id,
  start: Time.now.utc + 7.days,
  duration: 45,
)
Timetable.create!(
  coach_hash_id: coach2.hash_id,
  client_hash_id: client.hash_id,
  start: Time.now.utc + 5.days,
  duration: 30,
)
Timetable.create!(
  coach_hash_id: coach3.hash_id,
  client_hash_id: client.hash_id,
  start: Time.now.utc + 8.days,
  duration: 25,
)
