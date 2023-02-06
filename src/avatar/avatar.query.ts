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