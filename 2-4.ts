function giveId<T>(obj:T):T&{id:string}{
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id
  };
}

// 使用例
const obj1: {
  id: string;
  foo: number;
} = giveId({ foo: 123 });
// { foo: 123, id: "本当はランダムがいいけどここではただの文字列" }

const obj2: {
  id: string;
  num: number;
  hoge: boolean;
} = giveId({
  num: 0,
  hoge: true
});
// { num: 0, hoge: true, id: "本当はランダムがいいけどここではただの文字列" }

// エラー例
const obj3: {
  id: string;
  piyo: string;
} = giveId({
  foo: "bar"
});
// { foo: `bar`, id: "本当はランダムがいいけどここではただの文字列" } → { foo: string, id: string } !== {id: string, piyo: string}


// ---


const mos1 = {
  a: `A`, 
  b: `B`,
}

const mos2 = {
  ...mos1,
  c: `C`,
}

// obj2 → {
//   a: `A`,
//   b: `B`,
//   c: `C`,  
type Hoge = {
  foo: string,
  bar: number
}

const obj: Hoge & {
  foo: string,
  baz: boolean
} = {
  foo: 'foooooooo',
  bar: 3,
  baz: true,
};


type SpEed = "slow" | "mediam" | "fast"
function getspeed(speed: "slow" | "mediam" | "fast"): void {

}// }
