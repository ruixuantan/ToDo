SAMPLE_TASKS = [{
  description: 'Buy Apples',
  dateline: '1/1/2011',
  is_completed: false
},{
  description: 'Buy Bananas',
  dateline: '2/2/2012',
  is_completed: false
},{
  description: 'Buy Carrots',
  dateline: '3/3/2013',
  is_completed: false
}]

SAMPLE_TASKS.each do |task|
  Task.create(task)
end

SAMPLE_TAGS = [{
  name: 'high'
},{
  name: 'low'
},{
  name: 'mid'
}]

SAMPLE_TAGS.each do |tag|
  Tag.create(tag)
end
