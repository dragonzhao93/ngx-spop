###How to use
1. npm install ngx-spop
2. edit angular.json 
  ...
  "styles": [
    ...
    "node_modules/ngx-spop/lib/spop.scss",
    ...
  ]
3. import { SmallPop } from 'node_modules/ngx-spop';

  let spop = new SmallPop({
      template: '3 seconds autoclose',
      autoclose: 3000
    });