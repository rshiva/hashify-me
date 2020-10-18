
FactoryBot.define do
  factory :post do
    body {Faker::Name.unique.name }
    salty_password {Faker::Book.author }
    url_token {"hello"}
    expired_at {Time.now + 2.hours}
  end


end