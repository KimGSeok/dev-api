/**
 * Description: 유저의 생성 프로젝트 조회
 * Date: 2023.03.11
 * Author: Kim Gyeong Seok
 */
export const getProjectListQuery = `
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
`;

/**
 * Description: 프로젝트 상세정보 조회
 * Date: 2023.03.31
 * Author: Kim Gyeong Seok
 */
export const getProjectDetailInfoQuery = `
  SELECT
    PR.id,
    PR.name,
    PIF.id AS project_information_id,
    PIF.voice_id,
    PIF.avatar_id,
    PIF.audio_download_url,
    PIF.video_download_url
  FROM
    project AS PR
  LEFT JOIN
    project_information AS PIF
  ON
    PR.id = PIF.project_id
  WHERE
    PR.id = ?
  AND
    PR.deleted_at IS NULL
`;

/**
 * Description: 프로젝트 생성
 * Date: 2023.02.10
 * Author: Kim Gyeong Seok
 */
export const createProjectQuery = `
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