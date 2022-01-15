import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let myval=value.split(" ");
    let myAns="";
    for(let i in myval){
      let fc=myval[i].substr(0,1);
      let ac=myval[i].substr(1,value.length);
      myAns+=fc.toUpperCase()+ac.toLocaleLowerCase()+" ";
    }
    
    return myAns;
  }

}
