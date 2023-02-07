/**
 * Description: 음성 녹음 시 필요한 녹음 스크립트 목록
 * Date: 2023.02.05
 * Author: Kim Gyeong Seok
 */
export const getScriptExampleQuery = `
  SELECT
    id,
    type,
    script,
    DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
    DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
  FROM
    script_example
  WHERE
    deleted_at IS NULL
`;

/**
 * Description: 음성 및 영상 촬영 후, 생성된 파일로 아바타 자원파일 생성
 * Date: 2023.02.08
 * Author: Kim Gyeong Seok
 */
export const createAvatarQuery = `
  INSERT
  INTO
    avatar_resource
  VALUES
    (
      uuid = ?,
      avatar_id = ?,
      script_type = ?,
      avatar_type = ?,
      script = ?,
      path = ?,
      download_url = ?,
      file_name = ?,
      created_at = NOW(),
      updated_at = NOW(),
      deleted_at = NOW()
    )
`