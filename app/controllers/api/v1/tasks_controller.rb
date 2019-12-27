class Api::V1::TasksController < ApplicationController
  def index
    all_tasks = Task.all
    render json: all_tasks
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    render json: task
  end

  def destroy
    Task.destroy(params[:id])
    head :ok
  end

  private

  def task_params
    params.permit(:description, :dateline, :is_posted)
  end
end
