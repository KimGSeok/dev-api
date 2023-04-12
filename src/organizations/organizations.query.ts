/**
 * Description: 조직 및 조직별 사용자수 조회
 * Date: 2023.04.12
 * Author: Kim Gyeong Seok
 */
export const getOrganizatioMemberCountQuery = `
  SELECT
    ORG.id,
    ORG.uuid,
    ORG.name,
    count(ORG.id) AS count
  FROM
    user AS UR
  LEFT JOIN
    organization AS ORG
  ON
    UR.organization_id = ORG.id
  WHERE
    ORG.deleted_at IS NULL
  GROUP BY
    ORG.id;
`;