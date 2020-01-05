class Api::V1::TagsController < ApplicationController
  def index
    all_tags = Tag.all
    render json: all_tags
  end

  def create
    tag = Tag.create(tag_params)
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
    params.require(:tag).permit(:id, :name)
  end
end
