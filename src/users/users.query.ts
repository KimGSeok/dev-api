interface KeyValueProps {
  [key: string]: string
}

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
export const getUserListQuery = (organization: string) =>{
  const query = `
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
    ${organization !== 'all' ? `AND UR.organization_id = ${organization}` : ''}
    ORDER BY
      UR.id DESC;
  `;

  let params = [ organization ];
  params = params.filter((e: any) => { return e === 0 || e });
  return { query, params }
}

/**
 * Description: 유저 상세정보 조회
 * Date: 2023.04.17
 * Author: Kim Gyeong Seok
 */
export const getUserDetailInfoQuery = (id: string) =>{
  const query = `
    SELECT
      UR.id,
      UR.uuid,
      ORG.name AS organization_name,
      UR.name,
      UR.account,
      UR.phone,
      UR.email,
      UR.role,
      DATE_FORMAT(UR.login_at, '%Y-%m-%d %H:%i:%s') AS login_at,
      DATE_FORMAT(UR.created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
      DATE_FORMAT(UR.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
    FROM
      user AS UR
    LEFT JOIN
      organization AS ORG
    ON
      UR.organization_id = ORG.id
    WHERE
      UR.id = ?
    AND
      UR.deleted_at IS NULL
  `;

  let params = [ id ];
  params = params.filter((e: any) => { return e === 0 || e });
  return { query, params }
}

/**
 * Description: 유저 생성
 * Date: 2023.04.17
 * Author: Kim Gyeong Seok
 */
export const createUserQuery = (organizationId: string, password: string, data: KeyValueProps) =>{
  const query = `
    INSERT
    INTO
      user
      (
        uuid,
        organization_id,
        account,
        password,
        name,
        phone,
        email,
        role,
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
        ?,
        NOW(),
        NOW()
      )
  `;

  let params = [
    organizationId,
    data.id,
    password,
    data.name,
    data.phoneNumber,
    data.email,
    data.auth
  ];
  params = params.filter((e: any) => { return e === 0 || e });
  return { query, params }
}

/**
 * Description: 유저 정보 수정
 * Date: 2023.04.17
 * Author: Kim Gyeong Seok
 */
export const modifyUserQuery = (password:string, data: any) =>{
  const query = `
    UPDATE
      user
    SET
      password = ?,
      name = ?,
      phone = ?,
      email = ?,
      role = ?,
      updated_at = NOW()
    WHERE
      id = ?
    AND
      deleted_at IS NULL;
  `;

  let params = [password, data.name, data.phoneNumber, data.email, data.role, data.id];
  params = params.filter((e: any) => { return e === 0 || e });
  return { query, params }
}

/**
 * Description: 유저 삭제
 * Date: 2023.04.17
 * Author: Kim Gyeong Seok
 */
export const deleteUserQuery = (id: string) =>{
  const query = `
    UPDATE
      user
    SET
      updated_at = NOW(),
      deleted_at = NOW()
    WHERE
      id = ?
    AND
      deleted_at IS NULL;
  `;

  let params = [id];
  params = params.filter((e: any) => { return e === 0 || e });
  return { query, params }
}