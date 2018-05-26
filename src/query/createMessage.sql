INSERT INTO message
(
  message_uuid,
  name,
  email,
  phone,
  subject,
  details,
  created_at
)
VALUES
(
  ${uuid},
  ${name},
  ${email},
  ${mobile},
  ${subject},
  ${details},
  ${createdTime}
)
RETURNING *
