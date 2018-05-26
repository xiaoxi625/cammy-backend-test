import { defaultDb as db, loadQueryFile } from './../../clients/db';

let createMessageSql = loadQueryFile('createMessage.sql');
let getMessageSql = loadQueryFile('getMessage.sql');

class Db {
  createMessage(values){
    return db.task(function *(t) {
      return t.any(createMessageSql,values);
    })
  }

  getMessage(values){
    return db.task(function *(t) {
      return t.oneOrNone(getMessageSql,values);
    })
  }
  
}
export default new Db;
