import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/:id")
  getOne(@Param("id") props: string) {
    console.log('야호')
    try {

      return `this will return ${props}`;
    } catch (err) {
      console.error(err);
    }
  }

  @Post()
  createAvatar(@Body() data: object) {
    console.log(data);

    try {

    } catch (err) {

    }
  }

  @Delete()
  DeleteAvatar() {

  }

  @Put() /* All Updates */
  ModifyAllAvatar() {

  }

  @Patch('/:id') /* Someone Updates */
  ModifyAvatar(@Param('id') id: string, @Body() data) {
    try {
      console.log(data);

    } catch (err) {

    }

  }
}
