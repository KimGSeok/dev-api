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
      user_id,
      name,
      status,
      thumbnail_url,
      created_at,
      updated_at
    )
    VALUES
    (
      1,
      ?,
      'active',
      '',
      NOW(),
      NOW()
    )
`