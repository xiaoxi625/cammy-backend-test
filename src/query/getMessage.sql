SELECT
  message_uuid,
  name,
  email,
  phone,
  subject,
  details,
  created_at
FROM
  message
WHERE message_uuid = ${uuid}
