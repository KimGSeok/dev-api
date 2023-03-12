/**
 * Description: 사용자 존재 여부확인
 * Date: 2023.03.10
 * Author: Kim Gyeong Seok
 */
export const checkUserQuery =`
  SELECT
    count(*) AS cnt,
    account,
    password
  FROM
    user
  WHERE
    account = ?
  AND
    deleted_at IS NULL
`

export const getUserInfo = `
  SELECT
    UR.id,
    UR.uuid,
    ORG.name,
    ORG.id AS organization_id,
    ORG.role AS organization_role,
    UR.account,
    UR.password,
    UR.name,
    UR.phone,
    UR.email,
    UR.role
  FROM
    user AS UR
  LEFT JOIN
    organization AS ORG
  ON
    UR.organization_id = ORG.id
  WHERE
    UR.account = ?
  AND
    UR.deleted_at IS NULL
`