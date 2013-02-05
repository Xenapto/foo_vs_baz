task :before_deploy do
  Rake::Task['heroku:maintenance_on'].invoke
end

task :after_deploy do
  Rake::Task['heroku:maintenance_off'].invoke
end
