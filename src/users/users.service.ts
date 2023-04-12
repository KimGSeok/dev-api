import { Injectable } from "@nestjs/common";
import { ConnectionService } from "src/connection/connection.service";
import { getUserListQuery } from './users.query';
import { getOrganizatioMemberCountQuery } from "src/organizations/organizations.query";

interface KeyValueProps {
  [key: string]: string
}

@Injectable()
export class UsersService {

  constructor(
    private readonly connection: ConnectionService
  ) { }

  async getUsersList(userInfo: KeyValueProps, organization: string) {
    try {

      console.log(organization);

      let conditionParams = organization === 'all' ? `AND 1=1` : `AND UR.organization_id = ${organization}`
      let query = getUserListQuery;

      console.log(conditionParams);

      query.replace('  condition', `${conditionParams}`);

      console.log(query);

      console.log(conditionParams);

      const [userList] = await this.connection.connectionPool.query(query, [conditionParams]);
      const [allOrganizationList,] = await this.connection.connectionPool.query(getOrganizatioMemberCountQuery, []);

      // console.log(userList);

      const response = { userList, allOrganizationList }
      return response;
    } catch (error) {
      console.log('유저 목록 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }
}