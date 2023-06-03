
import _ from 'lodash';
import {toDataSourceRequestString, toDataSourceRequest} from '@progress/kendo-data-query';
import parseFitlerStr from './filterHelper/index.js';

const model={
    "filter": {
        "logic": "and",
        "filters": [
            {
                "field": "UnitsInStock",
                "operator": "lte",
                "value": 1
            },
            {
                "field": "ProductName",
                "operator": "startswith",
                "value": "chai"
            },
            {
                "field": "UnitPrice",
                "operator": "neq",
                "value": 18
            },
            {
                "field": "ProductID",
                "operator": "eq",
                "value": 1
            }
        ]
    },
    "sort": [
        {
            "field": "UnitsInStock",
            "dir": "asc"
        }
    ],
    "skip": 0,
    "take": 10
};

// const req=toDataSourceRequestString(model);
const req=toDataSourceRequest(model);
console.log(JSON.stringify(req,null,4))

const  str=req.filter;
const breakpoint='~and~';

let found=str.match(/\(([^)]+)\)/);

const splitted=found[1].split(breakpoint);

console.log(splitted);


const query=_(splitted).map(el=>{
    
    const tmp=el.split('~');
    return _.invoke(opMap,tmp[1],tmp);
}).join(" && ");

console.log(query);

