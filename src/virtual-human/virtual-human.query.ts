/**
 * Description: 음성 녹음 시 필요한 녹음 스크립트 목록
 * Date: 2023.02.05
 * Author: Kim Gyeong Seok
 */
export const getRecordScriptQuery = `
  SELECT
    RS.id,
    RS.uuid,
    RS.script,
    RST.type,
    DATE_FORMAT(RS.created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
    DATE_FORMAT(RS.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
  FROM
    record_script AS RS
  LEFT JOIN
    record_script_type AS RST
  ON
    RS.record_script_type_id = RST.id
  WHERE
    RS.deleted_at IS NULL
  ORDER BY
    rand();
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