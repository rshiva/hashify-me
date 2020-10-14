require 'rails_helper'

RSpec.describe "Posts", type: :request do
  describe "create /posts" do

    before(:each) do
      @post = build(:post)
    end

    it "success" do
      post "/v1/posts", params: attributes_for(:post)#, format: :json
      response_json = json_body(response)
      expect(response).to have_http_status(200)
    end

    it "body required" do
      post "/v1/posts", params: attributes_for(:post, body: "")
      response_json = json_body(response)
      expect(response_json['error']['error_message']).to eq("params missing")
      expect(response).to have_http_status(422)
    end
  end


  describe "decrypt" do
    before(:each) do
      @post = create(:post, body: "7F08A05F8D94FA1672CA2545CDC0938D5CD2D1467096C6C589612CE77609773E", salty_password: "$2a$12$.XEN24gW/NNwvTzXHt24SuiUW5C.rCuCdpi4xpfpbzSG8oDdGH.Hy")
    end

    it 'reveal encrypted message' do
      get "/v1/posts/#{@post.id}/reveal", params: {salty_password: "encrypt key"}

      response_json =  json_body(response)
      expect(response_json['data']['body']).to eq("Test the encryption")
      expect(response).to have_http_status(200)
    end
    

  end
end
