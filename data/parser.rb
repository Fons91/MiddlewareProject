sequence = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
months = Hash.new []
File.foreach("./referral.txt") { |line|
month = line.split('/')[1]
months[month] += [line]
 }

output = File.open("./referral_per_day","w")

 sequence.each{|month|
  puts "--------------#{month}"
    months[month].each{|day|
        output.write day
    }

 }

 output.close()
