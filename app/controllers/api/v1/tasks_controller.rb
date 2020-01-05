class Api::V1::TasksController < ApplicationController

  def index
    all_tasks = Task.all.order(:dateline).map do |task|
      {
        id: task.id,
        description: task.description,
        dateline: task.dateline,
        is_completed: task.is_completed,
        tags: task.tags.map do |tag|
          {
            name: tag.name
          }
        end
      }
    end
    render json: all_tasks
  end

  def create
    task = Task.new(task_params)
    tag_array = task.tags.collect { |tag| Tag.find_or_create_by(name: tag.name) }
    task.tags = []
    task.save
    make_tagging(tag_array, task.id)

    render task_json(task)
  end

  def show
    task = Task.find(params[:id])
    render json: task_json(task)
  end

  def update
    #tag_array = task.tags.collect { |tag| Tag.find_or_create_by(name: tag.name) }
    #make_tagging(tag_array, task.id)
    task = Task.find(params[:id])
    task.update(task_params)
    render task_json(task)
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
  end

  private

  def task_json(task)
    {
      id: task.id,
      description: task.description,
      dateline: task.dateline,
      is_completed: task.is_completed,
      tags: task.tags.map do |tag|
        {
          name: tag.name
        }
      end
    }
  end

  def make_tagging(tag_array, task_id)
    tag_array.map do |tag|
      tagging = Tagging.new
      tagging.task_id = task_id
      tagging.tag_id = tag.id
      tagging.save
    end
  end

  def task_params
    params.require(:task)
    .permit(:description, :dateline, :is_completed, tags_attributes: [:name])
  end
end
