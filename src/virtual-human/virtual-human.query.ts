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
 * Description: 음성 및 영상 촬영 후, 우선 생성 가상인간
 * Date: 2023.03.11
 * Author: Kim Gyeong Seok
 */
export const createVirtualHumanQuery = `
  INSERT
  INTO
    virtual_human
    (
      uuid,
      organization_id,
      user_id,
      name,
      type,
      status,
      record_script_count,
      created_at,
      updated_at
    )
    VALUES
    (
      ?,
      ?,
      ?,
      ?,
      ?,
      'start',
      ?,
      NOW(),
      NOW()
    )
`

/**
 * Description: 음성 및 영상 촬영 한 가상인간의 녹음 스크립트
 * Date: 2023.03.11
 * Author: Kim Gyeong Seok
 */
export const createVirtualHumanRecordResourceQuery = `
  INSERT
  INTO
    record_resource
    (
      uuid,
      virtual_human_id,
      record_script_id,
      record_type,
      file_name,
      storage_path,
      download_url,
      created_at,
      updated_at
    )
    VALUES
    (
      uuid(),
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      NOW(),
      NOW()
    )
`