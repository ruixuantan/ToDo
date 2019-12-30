class Api::V1::TasksController < ApplicationController

  def index
    all_tasks = Task.all.map do |task|
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
    task = Task.create(task_params)
    render task_json(task)
  end

  def show
    task = Task.find(params[:id])
    render json: task_json(task)
  end

  def update
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

  def task_params
    params.require(:task)
    .permit(:description, :dateline, :is_completed, tags_attributes: [:name])
  end
end
