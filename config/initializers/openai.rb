# frozen_string_literal: true

if ENV['OPENAI_KEY']
  OpenAI.configure do |config|
    config.access_token = ENV.fetch('OPENAI_KEY')
  end
end
