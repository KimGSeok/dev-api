/**
 * Description: 유저의 생성 프로젝트 조회
 * Date: 2023.03.11
 * Author: Kim Gyeong Seok
 */
export const getProjectListQuery =`
  SELECT
    id,
    uuid,
    team_id,
    name,
    status,
    thumbnail_url,
    DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
    DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
  FROM
    project
  WHERE
    user_id = ?
  AND
    deleted_at IS NULL
  ORDER BY
    id DESC;
`

/**
 * Description: 프로젝트 생성
 * Date: 2023.02.10
 * Author: Kim Gyeong Seok
 */
export const createProjectQuery =`
  INSERT
  INTO
    project
    (
      uuid,
      user_id,
      name,
      status,
      created_at,
      updated_at
    )
    VALUES
    (
      uuid(),
      ?,
      ?,
      'active',
      NOW(),
      NOW()
    )
`