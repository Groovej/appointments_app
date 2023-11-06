require 'spec_helper'

RSpec.describe Timetable, type: :model do
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of(:coach_hash_id) }
  it { is_expected.to validate_presence_of(:client_hash_id) }
  it { is_expected.to validate_presence_of(:duration) }
  it { is_expected.to validate_presence_of(:start) }
end
