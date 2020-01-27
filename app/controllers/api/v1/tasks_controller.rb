class Api::V1::TasksController < ApplicationController

  def index
    all_tasks = Task.where({user_id: current_user.id}).order(:dateline).map do |task|
      {
        id: task.id,
        description: task.description,
        dateline: task.dateline,
        is_completed: task.is_completed,
        user_id: current_user.id,
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
    task.user_id = current_user.id
    tag_array = task.tags.collect { |tag| Tag.find_or_create_by(name: tag.name,
      user_id: current_user.id) }
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
    puts("UPDATEUPDATE")
    task = Task.find(params[:id])
    delete_tagging(task.taggings)
    if params[:tags]
      tag_array = params[:tags].collect{ |tag| Tag.find_or_create_by(name: tag[:name],
        user_id: current_user.id) }
      make_tagging(tag_array, task.id)
    else
    end
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
      user_id: task.user_id,
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
      tagging.tag_id = tag.id
      tagging.task_id = task_id
      tagging.user_id = current_user.id
      tagging.save
    end
  end

  def delete_tagging(taggings)
    puts("RANTAN2")
    taggings.map do |tagging|
      tagging.destroy
    end
  end

  def task_params
    params.require(:task)
    .permit(:description, :dateline, :is_completed, tags_attributes: [:name])
  end
end
