source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.5'

gem 'bootsnap', '>= 1.17.0', require: false
gem 'devise', '~> 4.9', '>= 4.9.3'
gem 'js-routes', '~> 2.2.7'
gem 'puma', '~> 6.4.0'
gem 'rails', '~> 7.0.7'
gem 'sprockets-rails', '~> 3.4.2', :require => 'sprockets/railtie'
gem 'tzinfo-data', '~> 1.2023', '>= 1.2023.3', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'uglifier', '~> 4.2'

group :development, :test do
  gem 'factory_bot_rails', '6.2.0'
  gem 'faker', '2.23.0'
  gem 'rspec-rails', '6.0.1'
  gem 'shoulda-matchers', '4.5.1', require: false

  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'spring'
  gem 'foreman'
  gem 'pry-rails'
  gem 'pry-nav'
  gem 'sqlite3', '~> 1.6.8'
end

group :production do
  gem 'pg', '~> 1.5', '>= 1.5.4'
end
