require 'spec_helper'

RSpec.describe AvalabilityService, type: :service do
  describe 'fails' do
    it 'for user sessions intersection' do
      user = create(:user)
      coach = create(:user, :coach_user)

      timetable = create(:timetable,
        start: Time.parse("2023-11-22 10:00:00 UTC"),
        client_hash_id: user.hash_id,
        coach_hash_id: coach.hash_id,
        duration: 45
      )

      result = AvalabilityService.new({
        user: user, coach: coach, datetime: "2023-11-22 10:20:00 UTC", duration: 30
      }).call()

      expect(result).to eq(false)
    end

    it 'for coach sessions intersection' do
      user = create(:user)
      user2 = create(:user)
      coach = create(:user, :coach_user)

      timetable = create(:timetable,
        start: Time.parse("2023-11-22 10:00:00 UTC"),
        client_hash_id: user2.hash_id,
        coach_hash_id: coach.hash_id,
        duration: 50
      )

      result = AvalabilityService.new({
        user: user, coach: coach, datetime: "2023-11-22 10:20:00 UTC", duration: 30
      }).call()

      expect(result).to eq(false)
    end
  end

  describe 'sucess' do
    it 'for user sessions intersection' do
      user = create(:user)
      coach = create(:user, :coach_user)

      timetable = create(:timetable,
        start: Time.parse("2023-11-25 10:00:00 UTC"),
        client_hash_id: user.hash_id,
        coach_hash_id: coach.hash_id,
        duration: 45
      )

      result = AvalabilityService.new({
        user: user, coach: coach, datetime: "2023-11-26 12:20:00 UTC", duration: 30
      }).call()

      expect(result).to eq(true)
    end

    it 'for coach sessions intersection' do
      user = create(:user)
      user2 = create(:user)
      coach = create(:user, :coach_user)

      timetable = create(:timetable,
        start: Time.parse("2023-11-26 10:00:00 UTC"),
        client_hash_id: user2.hash_id,
        coach_hash_id: coach.hash_id,
        duration: 50
      )

      result = AvalabilityService.new({
        user: user, coach: coach, datetime: "2023-11-27 13:00:00 UTC", duration: 12
      }).call()

      expect(result).to eq(true)
    end
  end
end
