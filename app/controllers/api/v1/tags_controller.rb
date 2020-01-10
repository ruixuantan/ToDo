class Api::V1::TagsController < ApplicationController
  def index
    all_tags = Tag.where({user_id: current_user.id})
    render json: all_tags
  end

  def create
    tag = Tag.new(tag_params)
    tag.user_id = current_user.id
    tag.save
    render json: tag
  end

  def show
    tag = Tag.find(params[:id])
    render json: tag
  end

  def destroy
    tag = Tag.destroy(params[:id])
  end

  def tag_params
    params.require(:tag).permit(:id, :name, :user_id)
  end
end
