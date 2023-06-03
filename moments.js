import moment from 'moment';

const today=moment(new Date('06/01/2022 00:00'),'YYYY-MM-DD');
const someday=moment('2023-06-01T00-00-00','YYYY-MM-DD');

// const result=today.isSame(someday,'day');
const result=moment(new Date('06/01/2023 00:00'),'YYYY-MM-DD').isSame(moment('2023-06-01T00-00-00','YYYY-MM-DD'),'day');

console.log(result)
