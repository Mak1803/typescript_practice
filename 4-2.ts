//type T1 = Pick<MyObj, Exclude<keyof MyObj, 'baz'>>;
//Pick<T,Exclude<keyof T,'id'>>={[P in Exclude<keyof T,'id'>]:T[P]}
//type MyPick<T, K extends keyof T> = { [P in K]: T[P]; }

function  giveId <T>(obj:T):{[P in Exclude<keyof T,'id'>]:T[P]}&{id:string}{
    const id = "本当はランダムがいいけどここではただの文字列";
    return {
      ...obj,
      id
    };
  }
  
  // 使用例
  /*
   * obj1の型は { foo: number; id: string } 型
   */
  const tac1 = giveId({ foo: 123 });
  /*
   * obj2の型は { num : number; id: string } 型
   */
  const tac2 = giveId({
    num: 0,
    id: 100,
  });
  // obj2のidはstring型なので別の文字列を代入できる
  tac2.id = '';

    /*
   * obj2の型は { num : number; id:number } 型
   */

  //giveId<T>(obj:T):{[P in keyof Exclude<keyof T,'id'>]:T[P]}&{id:string}
  //1 giveId<num:number;id:number>:{[P in keyof {num:number}]:{num:number;id:number}[P]}&{id:string}
  //2 giveId<num:number;id:number>:{[P in keyof "num"]:{num:number;id:number}[P]}&{id:string}

// giveId <T>(obj:T):Pick<T,Exclude<keyof T,'id'>>&{id:string}
// giveId <{num: number; id: number}>(obj:T):Pick<T,Exclude<keyof T,'id'>>&{id:string}
// giveId <{num: number; id: number}>(obj:{num: number; id: number}):Pick<{num: number; id: number},Exclude<keyof {num: number; id: number},'id'>>&{id:string}
// giveId「省略」:Pick<{num: number; id: number},Exclude<keyof {num: number; id: number},'id'>>&{id:string}
// giveId「省略」:Pick<{num: number; id: number},Exclude<'num'|'id','id'>>&{id:string}

type MyExclude<T, U> = T extends U ? never : T
type MyExclude<'num'|'id', 'id'> = 'num'|'id' extends 'id' ? never : 'num'|'id'

type MyExclude2<T = 'num'|'id', U = 'id'> = T extends U ? never : T
//                                        = ('num' extends 'id'?never:'num')|('id' extends 'id'?never:'id')
//                                        = ('num')|(never)
//                                        = 'num'

// giveId「省略」:Pick<{num: number; id: number},'num'>&{id:string}

type MyPick<T, K extends keyof T> = { [P in K]: T[P]; }
// giveId「省略」: {num:number} &{id:string}

// giveId「省略」:{ num : number; id:string }

// MyPick<{num: number; name: string; id: number},'num' | 'name'>
// MyPick<T={num: number; name: string; id: number}, K extends keyof T=('num' | 'name')> = { [P in K]: T[P]; }
//                                                                                       = { [P in 'num' | 'name']: {num: number; name: string; id: number}[P]; }
//                                                                                       ={
//                                                                                          [P in 'num']:{num: number; name: string; id: number}[P];
//                                                                                          [P in 'name']:{num: number; name: string; id: number}[P]
//                                                                                        }
//                                                                                       ={
//                                                                                          ['num']:{num: number; name: string; id: number}['num'];
//                                                                                          ['name']:{num: number; name: string; id: number}['name']
//                                                                                        }
//                                                                                       ={
//                                                                                          num:number;
//                                                                                          name:string;
//                                                                                        }
// {num: number; name:string}