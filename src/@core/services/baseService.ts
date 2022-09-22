import { Injectable } from "@angular/core";
import * as moment from 'moment';

export class BaseService
{


 public FormatDate(value:Date):string
 {
     return moment(value).format('YYYY-MM-DD');
 }


}