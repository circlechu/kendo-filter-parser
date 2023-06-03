import _ from 'lodash';
import { toDataSourceRequestString, toDataSourceRequest } from '@progress/kendo-data-query';
// import parseFitlerStr from './filterHelper/index.js';
// import model from './json/req1.json' assert { type: 'json' };
// import model from './json/req2.json' assert { type: 'json' };
// import model from './json/req3.json' assert { type: 'json' };
import model from './json/req4.json' assert { type: 'json' };

const req = toDataSourceRequest(model);
console.log(req.filter)

// var rx2 = /\(([^)]+)\)/;
// let found = req.filter.match(rx2);
// console.log(JSON.stringify(found,null,4))
// // const fn = parseFitlerStr(req.filter);
// // console.log(fn.toString())
function parseFilterExpression(filterExpression) {
    const regex = /\(?([^()]+)\)?/g;
    const conditions = [];
  
    let matches;
    while ((matches = regex.exec(filterExpression)) !== null) {
      const subExpression = matches[1];
      const condition = parseSubExpression(subExpression);
      conditions.push(condition);
    }
  
    return conditions.join(' AND ');
  }
  
  function parseSubExpression(subExpression) {
    // const regex = /(\w+)~(eq|ne|gt|lt|gte|lte)~([\w.-]+)/g; 
    const regex = /(\w+)~(eq|ne|gt|lt|gte|lte)~'?([^']+)'?/g // for date example: FirstOrderedOn~eq~'2023-06-03T04:00:00.000Z'
    const conditions = [];
  
    let matches;
    while ((matches = regex.exec(subExpression)) !== null) {
      const field = matches[1];
      const operator = matches[2];
      const value = matches[3];
      const condition = generateCondition(field, operator, value);
      conditions.push(condition);
    }
  
    return conditions.join(' OR ');
  }
  
  function generateCondition(field, operator, value) {
    const operators = {
      eq: '=',
      ne: '<>',
      gt: '>',
      lt: '<',
      gte: '>=',
      lte: '<=',
    };
  
    return `${field} ${operators[operator]} '${value}'`;
  }
  
  const filterExpression = `${req.filter}`;//'((ProductID~eq~1~or~ProductID~eq~2)~and~(UnitPrice~gte~0~and~UnitPrice~lte~10))';
  const sqlStatement = `SELECT * FROM your_table WHERE ${parseFilterExpression(filterExpression)}`;
  
  console.log(sqlStatement);
  