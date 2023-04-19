import { Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ConnectionService } from "src/connection/connection.service";
import {
  getUserListQuery,
  checkUserQuery,
  createUserQuery,
  getUserDetailInfoQuery,
  modifyUserQuery,
  deleteUserQuery
} from './users.query';
import {
  getOrganizatioMemberCountQuery,
} from "src/organizations/organizations.query";


interface KeyValueProps {
  [key: string]: string
}

@Injectable()
export class UsersService {

  constructor(private readonly connection: ConnectionService) { }

  /**
   * Description: 유저 상세정보 조회
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  async getUserDetailInfo(userInfo: KeyValueProps, id: string) {
    try {

      const { query, params } = getUserDetailInfoQuery(id);

      const [userDetailInfo] = await this.connection.connectionPool.query(query, params);
      return userDetailInfo[0];
    } catch (error) {
      console.log('유저 상세정보 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  /**
   * Description: 유저 목록 조회
   * Date: 2023.04.12
   * Author: Kim Gyeong Seok
   */
  async getUsersList(userInfo: KeyValueProps, organization: string) {
    try {

      const { query, params } = getUserListQuery(organization);

      const [userList] = await this.connection.connectionPool.query(query, params);
      const [allOrganizationList]: any = await this.connection.connectionPool.query(getOrganizatioMemberCountQuery, []);

      let totalCount = 0;
      allOrganizationList && allOrganizationList.map((item) => {
        totalCount += item.count;
      })

      const response = { userList, allOrganizationList, totalCount }
      return response;
    } catch (error) {
      console.log('유저 목록 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  /**
   * Description: 유저 생성
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  async createUser(userInfo: KeyValueProps, data: KeyValueProps) {
    try {

      const [response,] = await this.connection.connectionPool.query(checkUserQuery, [data.id]);

      if (response[0].cnt > 0)
        throw new ConflictException;
      else {

        const password = await bcrypt.hash(data.password, 10);

        const { query, params } = createUserQuery(userInfo.organization_id, password, data);
        const [user] = await this.connection.connectionPool.query(query, params);

        return user;
      }
    } catch (error) {
      console.log('유저 생성 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  /**
   * Description: 유저 정보 수정
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  async modifyUserInfo(userInfo: KeyValueProps, data: KeyValueProps) {
    try {

      const password = await bcrypt.hash(data.password, 10);

      const { query, params } = modifyUserQuery(password, data);
      const [userDetailInfo] = await this.connection.connectionPool.query(query, params);

      return userDetailInfo;
    } catch (error) {
      console.log('유저 정부 수정중 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  /**
   * Description: 유저 정보 삭제
   * Date: 2023.04.17
   * Author: Kim Gyeong Seok
   */
  async deleteUserInfo(data: KeyValueProps) {
    try {

      const { query, params } = deleteUserQuery(data.id);
      const [response] = await this.connection.connectionPool.query(query, params);
      return response;
    } catch (error) {
      console.log('유저 정부 수정중 로직 에러발생');
      console.log(error);
      return error;
    }
  }
}