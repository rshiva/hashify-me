module ApiHelpers 
  def json_body(response)
    JSON.parse(response.body) 
  end
end
  