SAMPLE_TASKS = [{
  description: 'Buy Durians',
  dateline: DateTime.new(2020, 1, 1, 0, 0, 0),
  is_completed: false
},{
  description: 'Buy Eggs',
  dateline: DateTime.new(2020, 2, 2, 0, 0, 0),
  is_completed: false
},{
  description: 'Buy Ferrari',
  dateline: DateTime.new(2020, 3, 3, 0, 0, 0),
  is_completed: false
}]

SAMPLE_TASKS.each do |task|
  Task.create(task)
end
