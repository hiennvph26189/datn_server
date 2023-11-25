const moment = require('moment-timezone');
const hanoiTimezone = 'Asia/Ho_Chi_Minh';
let getdate = ()=>{
  let date = moment().tz(hanoiTimezone).format('YYYY-MM-DD HH:mm:ss');      
    return date;
}
module.exports  = {
  getdate:getdate

}