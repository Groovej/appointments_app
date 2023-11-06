# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= "test"

require File.expand_path("../../config/environment", __FILE__)
abort('The Rails environment is running in production mode!') if Rails.env.production?

require 'factory_bot_rails'
require 'pry'
require 'rake'
require 'rspec/rails'
require 'shoulda/matchers'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

module RequestHelperMethods
  def json_body
    JSON.parse response.body, symbolize_names: true
  end
end

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  config.include RequestHelperMethods, type: :controller

  config.disable_monkey_patching!

  # These lines make RSpecs test ordering random, but deterministic. The
  # randomness of each run is based on a seed number, and by default that
  # number changes on each run. But if that seed number is the same in two
  # different runs of RSpec, the tests will run in the same order both times.
  config.order = :random
  Kernel.srand config.seed

  RSpec::Expectations.configuration.on_potential_false_positives = :raise

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!
  config.before(:all) { Rails.cache.clear }
end
