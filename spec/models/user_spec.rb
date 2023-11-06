require 'spec_helper'

RSpec.describe User, type: :model do
  it { is_expected.to have_many :timetables }

  it { is_expected.to validate_presence_of(:hash_id) }
  it { is_expected.to validate_presence_of(:role) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
end
