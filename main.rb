require 'sinatra'
require 'json'



set :public_folder, "./public"

def get_json_from_file(filename)
  file = File.open(filename)
  data = []
  file.each{|line|
    data<< line.chomp
  }
  file.close
  data.to_json
end

def get_referral_from_file(filename, min)
    begin
      minimum = Integer(min)
    rescue
      minimum=0
   end
    data = {}
    data["name"] = "cluster"
    data["children"] = []
    file = File.open(filename)
    file.each{|line|
        domain = line.split("\t")[0]
        count = line.split("\t")[1].chomp.to_i
        next unless count > minimum
        field = {}
        field["name"] = domain.gsub(/\Ahttp:\/\/www\./,'')
        field["size"] = count
        data["children"] << field
    }
    file.close
    data.to_json
end

get '/' do
 # erb :index,  :locals => {:data => data}
  send_file File.join(settings.public_folder, 'index.html')
end



get "/pageviews" do
  content_type :json
  get_json_from_file "./data/page_views.txt"
end

get "/referral" do
    min = 2000
    content_type :json
    get_referral_from_file "./data/referral_per_domain.txt",min
end

get "/referring" do
    content_type :json
    get_json_from_file "./data/referring_per_day.txt"
end

get "/videoremix" do
    content_type :json
    get_json_from_file "./data/video_remix.txt"
end

get "/videovanilla" do
    content_type :json
    get_json_from_file "./data/video_vanilla.txt"
end
