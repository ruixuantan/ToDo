SAMPLE_TASKS = [{
  description: 'Buy Apples',
  dateline: '1/1/2011',
  is_posted: true
},{
  description: 'Buy Bananas',
  dateline: '2/2/2012',
  is_posted: true
},{
  description: 'Buy Carrots',
  dateline: '3/3/2013',
  is_posted: true
}]

SAMPLE_TASKS.each do |task|
  Task.create(task)
end
