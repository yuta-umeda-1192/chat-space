json.array! @users do |user|
  json.id user.id
  json. name  user.name
  # jsom. email user.email 
  # jsom. encrypted_password user.encrypted_password
  # jsom. reset_password_token user.reset_password_token
  # jsom. reset_password_sent_at user.reset_password_sent_at
  # jsom. remember_created_at user.remember_created_at
  # jsom. created_at user.created_at
  # jsom. updated_at user.updated_at
end