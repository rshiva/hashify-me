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
      expect(response_json['error']['error_type']).to eq("validation")
      expect(response).to have_http_status(422)
    end
  end


  describe "decrypt" do
    before(:each) do
      @post = create(:post, body: "7F08A05F8D94FA1672CA2545CDC0938D5CD2D1467096C6C589612CE77609773E", salty_password: "$2a$12$.XEN24gW/NNwvTzXHt24SuiUW5C.rCuCdpi4xpfpbzSG8oDdGH.Hy")
    end

    it 'reveal encrypted message' do
      get "/v1/posts/#{@post.id}/reveal/?token=#{@post.url_token}", params: {salty_password: "encrypt key"}

      response_json =  json_body(response)
      expect(response_json['data']['body']).to eq("Test the encryption")
      expect(response).to have_http_status(200)
    end    
  end


  describe "show " do
    before(:each) do
      @post = create(:post)
    end

    it 'page exist' do
      puts "page exist"
      get '/v1/secret', params: {token: @post.url_token} 

      response_json =  json_body(response)
      expect(response_json['data']['token']).to eq(@post.url_token)
      expect(response).to have_http_status(200)
    end

    it 'page does not exist' do
      puts "page does not exist"
      get '/v1/secret', params: {token: "rassmdsadmasd"} 

      response_json =  json_body(response)
      expect(response_json['error']['error_type']).to eq("not_found")
      expect(response).to have_http_status(404)
    end


    it 'expired unvisited post deleted' do
      puts "expired unvisited post deleted"
      @post = create(:post, expired_at: Date.yesterday)

      get '/v1/secret', params: {token: @post.url_token} 
      response_json =  json_body(response)
      expect(response_json['error']['error_type']).to eq("not_found")
      expect(response).to have_http_status(404)

    end
  end
end
