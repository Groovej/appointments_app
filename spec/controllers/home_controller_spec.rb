require 'spec_helper'

RSpec.describe HomeController, type: :controller do
  let!(:user) { create :user }
  let(:coach) { create :user, :coach_user }
  let!(:timetable) { create :timetable, client_hash_id: user.id, coach_hash_id: coach.hash_id }

  before do
    allow(controller).to receive(:authenticate_user!).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  context 'data requests' do
    it 'returns correct users data' do
      get :user

      expect(response).to be_successful
      expect(json_body.keys).to eq([:user])
      expect(json_body[:user].keys).to contain_exactly(:firstName, :lastName, :role)
    end

    it 'returns correct incomming appointments and coaches data' do
      get :imcoming

      expect(response).to be_successful
      expect(json_body.keys).to eq([:data, :coaches])
      expect(json_body[:coaches].first.keys).to contain_exactly(:hash_id, :first_name, :last_name)
    end

    it 'returns correct incomming appointments and coaches data' do
      get :coaches

      expect(response).to be_successful
      expect(json_body.keys).to eq([:coaches])
      expect(json_body[:coaches].first.keys).to contain_exactly(:hash_id, :first_name, :last_name)
    end
  end

  context 'create method' do
    context 'fails for' do
      it 'coach id' do
        client_user = create :user
        params = {
          appointment: {
            coach_id: client_user.hash_id,
            datetime: Faker::Time.between(from: DateTime.now, to: DateTime.now + 2.days),
            duration: 30
          }
        }
        post :create, params: params

        expect(response.status).to eq(422)
        expect(json_body[:success]).to be_falsey
      end

      context 'invalid booking time' do
        before do
          allow_any_instance_of(AvalabilityService).to receive(:call).and_return(false)
        end

        it 'fails' do
          params = {
            appointment: {
              coach_id: coach.hash_id,
              datetime: Faker::Time.between(from: DateTime.now, to: DateTime.now + 6.days),
              duration: 30
            }
          }
          post :create, params: params

          expect(response.status).to eq(422)
          expect(json_body[:success]).to be_falsey
        end
      end
    end

    it 'success' do
      params = {
        appointment: {
          coach_id: coach.hash_id,
          datetime: Faker::Time.between(from: DateTime.now, to: DateTime.now + 6.days),
          duration: 30
        }
      }
      post :create, params: params

      expect(response.status).to eq(200)
      expect(json_body.keys).to contain_exactly(:success, :appointment)
    end
  end
end
