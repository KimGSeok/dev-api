/**
 * Description: 사용자 존재 여부확인
 * Date: 2023.03.10
 * Author: Kim Gyeong Seok
 */
export const checkUserQuery = `
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

/**
 * Description: 로그인한 사용자 정보 조회
 * Date: 2023.03.16
 * Author: Kim Gyeong Seok
 */
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

/**
 * Description: 유저 목록 조회
 * Date: 2023.04.12
 * Author: Kim Gyeong Seok
 */
export const getUserListQuery = `
  SELECT
    UR.id,
    UR.uuid,
    ORG.name AS organization_name,
    UR.account,
    UR.name,
    UR.phone,
    UR.email,
    UR.role,
    DATE_FORMAT(UR.created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
    DATE_FORMAT(UR.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
  FROM
    user AS UR
  LEFT JOIN
    organization AS ORG
  ON
    UR.organization_id = ORG.id
  WHERE
    UR.deleted_at IS NULL
  AND
    condition
  ORDER BY
    UR.id DESC;
`