(Dir.glob("./lib/**/*.rb") + Dir.glob("./lib/*.rb")).each { |file| require file }
