if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_todo",
    domain: "young-headland-66589.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_todo"
end
