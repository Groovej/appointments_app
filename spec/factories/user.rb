FactoryBot.define do
  factory :user do
    email                 { Faker::Internet.email }
    password              { "Complexity-Password_1" }
    password_confirmation { password }
    first_name            { Faker::Name.first_name }
    last_name             { Faker::Name.last_name }
    role                  { 'client' }
    hash_id               { Faker::Alphanumeric.alphanumeric(number: 10) }
  end

  trait :coach_user do
    role { 'coach' }
  end
end
