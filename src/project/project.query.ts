/**
 * Description: 유저의 생성 프로젝트 조회
 * Date: 2023.03.11
 * Author: Kim Gyeong Seok
 */
export const getProjectListQuery = `
  SELECT
    P.id,
    P.uuid,
    P.team_id,
    P.name,
    P.status,
    P.thumbnail_url,
    PIF.audio_download_url,
    PIF.video_download_url,
    DATE_FORMAT(P.created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
    DATE_FORMAT(PIF.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
  FROM
    project AS P
  LEFT JOIN
    project_information AS PIF
  ON
    P.id = PIF.project_id
  WHERE
    P.user_id = ?
  AND
    P.deleted_at IS NULL
  ORDER BY
    P.id DESC;
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
		(
			SELECT
				name
			FROM
				virtual_human AS VH
			WHERE
				PR.user_id = VH.user_id 
			AND
				VH.uuid = PIF.voice_id
			AND
				PIF.project_id = ?
		) AS voice_name,
		PIF.avatar_id,
		(
			SELECT
				name
			FROM
				virtual_human AS VH
			WHERE
				PR.user_id = VH.user_id 
			AND
				VH.uuid = PIF.avatar_id 
			AND
				PIF.project_id = ?
		) AS avatar_name,
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
 * Description: 프로젝트 스크립트 상세정보 조회
 * Date: 2023.04.03
 * Author: Kim Gyeong Seok
 */
export const getProjectScriptInfoQuery = `
	SELECT
		id,
		project_id,
		script as text,
		speed,
		wait_time as pauseSecond
	FROM
		project_script
	WHERE
		project_id = ?
	AND
		deleted_at IS NULL;
`;

/**
 * Description: 프로젝트 상세정보 존재여부
 * Date: 2023.04.03
 * Author: Kim Gyeong Seok
 */
export const isCheckProjectDetailQuery = `
  SELECT
    count(*) AS count
  FROM
    project_information
  WHERE
    project_id = ?
  AND
    deleted_at IS NULL
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
`;

/**
 * Description: 프로젝트 상세정보 저장
 * Date: 2023.04.02
 * Author: Kim Gyeong Seok
 */
export const createProjectInformationQuery = `
  INSERT
  INTO
    project_information
    (
      project_id,
      voice_id,
      avatar_id,
      audio_download_url,
      video_download_url,
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
      NOW(),
      NOW()
    )
`

/**
 * Description: 프로젝트 상세정보 수정
 * Date: 2023.04.03
 * Author: Kim Gyeong Seok
 */
export const updateProjectInformationQuery = `
  UPDATE
    project_information
  SET
    voice_id = ?,
    avatar_id = ?,
    audio_download_url = ?,
    video_download_url = ?,
    updated_at = NOW()
  WHERE
    project_id = ?
  AND
    deleted_at IS NULL
`

/**
 * Description: 프로젝트 컨텐츠 스크립트 삭제
 * Date: 2023.04.03
 * Author: Kim Gyeong Seok
 */
export const deleteProjectScriptQuery = `
  UPDATE
		project_script
  SET
		deleted_at = NOW()
	WHERE
		project_id = ?
	AND
		deleted_at IS NULL;
`

/**
 * Description: 프로젝트 컨텐츠 변환 스크립트 저장
 * Date: 2023.04.02
 * Author: Kim Gyeong Seok
 */
export const createProjectScriptQuery = `
  INSERT
  INTO
		project_script
    (
      uuid,
      project_id,
			script,
			speed,
			wait_time,
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
      NOW(),
      NOW()
    )
`

/**
 * Description: 프로젝트 삭제
 * Date: 2023.04.06
 * Author: Kim Gyeong Seok
 */
export const deleteProjectQuery = `
  UPDATE
    project
  SET
    updated_at = NOW(),
    deleted_at = NOW()
  WHERE
    id = ?
  AND
    deleted_at IS NULL
`