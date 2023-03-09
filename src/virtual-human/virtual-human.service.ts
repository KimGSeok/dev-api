import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from "src/connection/connection.service";
import { getRecordScriptQuery, createAvatarQuery } from './virtual-human.query';

let url: string;

// Environment
if (process.env.NODE_ENV === 'development')
  url = 'http://localhost:30001/';
else
  url = 'https://api.cidev.kr/';

@Injectable()
export class VirtualHumanService {

  constructor(
    private connection: ConnectionService,
    private readonly httpService: HttpService
  ) { }

  async getVoiceScriptExampleList() {
    try {

      // Query
      const [response, field] = await this.connection.connectionPool.query(getRecordScriptQuery, []);
      return response;
    } catch (error) {
      console.log('아바타 스크립트 조회 로직 에러발생');
      console.log(error);
      return error;
    }
  }

  async uploadFiles(data: object[], avatarId: string, avatarType: string, files: Array<Express.Multer.File>) {
    try {

      // console.log(data);
      // console.log(avatarId);
      // console.log(avatarType);
      // console.log(files);

      // console.log(files[0].destination.split('/'));
      // console.log(files[0].destination.split('/')[1]);

      (await this.connection.connectionPool.getConnection()).beginTransaction();

      // For Finetuning ResourceList
      let urlArr = []; // Files
      let scriptArr = []; // data

      files.forEach(async (item: any) => {
        urlArr.push(url + `file/download?date=${item.destination.split('/')[2]}&avatar=${avatarId}&file=${item.filename}`);
      })

      data.forEach(async (item: any) => {
        scriptArr.push(item.script);
      })

      // Fast API 요청
      const FAST_API_URL = 'http://fury.aitricsdev.com:40068/finetune';
      const options = {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      // TODO Voice 일때
      const body = {
        "urls": urlArr,
        "scripts": scriptArr,
        "audio_twin_version": avatarId
      }

      const test = {
        "urls": [
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=09e215e5-897d-4938-b5dd-56b30e453be6.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=12b6631f-ea99-46c3-9594-58e21bdb483b.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=1baae481-2f7a-4620-bc47-72e62f903a53.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=25b3d65d-43fc-4704-897a-12f19cfe309b.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=495ae5e4-2ac0-429a-9564-61cd25a7a871.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=5b6832a2-be7c-440e-8e5d-c1ec97b8f096.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=5fa3ce62-b9d4-4a7f-958d-06b583680cc3.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=6a53e3c0-89fc-42b5-8682-ff70e3a869cf.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=7b019997-9e43-4ef7-bf59-62ffd7ef9c58.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=80205190-77f7-459a-aab8-79efb89e1cdd.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=8f2c9b06-379c-427c-b279-7ccbc4ec7552.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=9e628ae1-846c-4f7a-87ea-79a746f3a111.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=b1dd934b-a330-4850-a4d1-e07ff45b7f29.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=bfd45ddb-e589-44d7-8278-dfc88494e6e0.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=cc1a115c-afbc-4504-bc73-7a07750e2cfb.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=ce5b91c2-5fcd-4229-bd44-8b6f9d2d7b07.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=d43ade45-9737-4ba3-bc89-8436b002e1ef.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=e73132fb-61e7-485e-9f77-b7115a196edc.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=f97f24cc-b87d-489f-bf9b-d0a1d365a46c.wav",
            "https://api.cidev.kr/file/download?date=2023-03-09&avatar=f8dbb726-636a-45da-a2fe-8ace86d56dd1}&file=fbd93c81-4ede-49d7-b588-9f085eed1247.wav"
        ],
        "scripts": [
            "더불어민주당 이재명 의원은 윤석열 대통령을 향해 안보의식에 문제가 있다고 비판했습니다.",
            "정부는 국정과제에 포함된 공공기관 효율화를 위한 작업에 본격적으로 착수했다.",
            "재약정 가입자들에게는 경품 지급에 소극적인 것으로 나타났다.",
            "더욱 거대하고 확장된 세계관을 담은 후속편으로 관객을 찾았다.",
            "장소의 원래 기능 그다음에 목적성을 파괴시키는 효과를 가져와요.",
            "그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.",
            "양국은 이번 회담의 구체적인 의제와 일정은 계속 조율하기로 했다.",
            "2010년부터 10년간 태풍의 72시간 진로 예보 오차는 절반 정도로 줄었다.",
            "그의 얼굴이 빗자루를 타고 날아가는 <마녀 배달부 키키>처럼 환해졌다.",
            "해산물이니까 아무래도 비린맛이 있겠죠?",
            "디아블로 시리즈의 신작 '디아블로 이모탈'이 전격 출시했다.",
            "러시아 언론인이자 노벨평화상 수상자인 드미트리 무라토프가 노벨상 메달을 경매에 내놨습니다.",
            "국립근대미술관 건립을 거듭 촉구했습니다.",
            "졸이듯이 볶는다라고 생각을 해주시면 되겠습니다.",
            "카더라 통신이라고 이제 얘길 하잖아요.",
            "이에 따라 안구건조증을 앓고 있는 사람에게도 부작용 없이 시력 교정 효과를 기대할 수 있다.",
            "일각에선 누리호를 '국내 기술'로 보기 어렵지 않냐는 지적들이 나온다.",
            "이 외에 글루코사민 같은 것들은 건강 보조제로도 나와 있습니다.",
            "동물 학대는 결국 인간을 대상으로 한 범죄로 이어진다는 것이 그간 많은 통계로 증명됐다.",
            "근데 이것도 사실은 상징적이에요."
        ],
        "audio_twin_version": "f8dbb726-636a-45da-a2fe-8ace86d56dd1}"
      }

      console.log(body);

      console.log(test);

      const response: any = await this.httpService.post(FAST_API_URL, test, options).toPromise();

      console.log(response.data);


      // TODO
      // data.forEach(async (item: any) => {

      // await this.connection.connectionPool.query(createAvatarQuery, []);
      // })

      console.log(avatarId);

      (await this.connection.connectionPool.getConnection()).commit();

      return avatarId;
    } catch (error) {

      (await this.connection.connectionPool.getConnection()).rollback();
      console.log('아바타 스크립트 생성 로직 에러발생');
      console.error(error);
      return error;
    }
  }
}