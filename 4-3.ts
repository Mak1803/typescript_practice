interface EventPayloads {
    start: {
      user: string;
    };
    stop: {
      user: string;
      after: number;
    };
    end: {};
  }

  type Spread<Ev, EvOrig, E> = Ev extends keyof E
  ? EvOrig[] extends Ev[]
    ? E[Ev]
    : never
  : never;
  
  class EventDischarger<E> {
    emit<Ev extends keyof E>(eventName: Ev, payload:Spread<Ev,Ev,E>/* ここを埋める */) {
      // 省略
    }
  }
  
  // 使用例
  const ed = new EventDischarger<EventPayloads>();
  ed.emit("start", {
    user: "user1"
  });
  ed.emit("stop", {
    user: "user1",
    after: 3
  });
  ed.emit("end", {});
  
  // エラー例
  ed.emit<"start" | "stop">("stop", {
    user: "user1"
  });

//ed.emit<"start", {user: "user1"});>
// 1-1 Spread<start, EvOrig, EventPayloads> = start extends keyof EventPayloads
  //? EvOrig[] extends start[]
    //? E[start]
    //: never
  //: never;

// 1-2 Spread<start, EvOrig, EventPayloads> = start extends start|stop|end
  //? EvOrig[] extends start[]
    //? E[start]
    //: never
  //: never;

// 1-3 Spread<start, EvOrig, EventPayloads> = 
//start extends start 
//EvOrig[] extends start[]
    //? E[start]
    //: never
  //: never;
//|start extends stop 
  //? EvOrig[] extends start[]
    //? E[start]
    //: never
  //: never;
//|start extends end 
  //? EvOrig[] extends start[]
    //? E[start]
    //: never
  //: never;

// 1-4 Spread<start, EvOrig, EventPayloads> = 
//start extends start 
//EvOrig[] extends start[]
    //? E[start]
    //: never
  //: never;
//|never|never;

// 2 Spread<start, EvOrig, EventPayloads> = 
  //? start extends start;
    //? E[start]
    //: never
  //: never;

// 3 Spread<start, EvOrig, EventPayloads> = 
    //start extends start? E[start]: never

// 4 Spread<start, EvOrig, EventPayloads> = EventPayloads[start]
// 5 Spread<start, EvOrig, EventPayloads> = {user: string;};

//ed.emit ed.emit<"start" | "stop">("stop", {user: "user1"});
// 1 type Spread<"start" | "stop", EvOrig, EventPayloads> = "start" | "stop" extends keyof  EventPayloads
//  ? EvOrig[] extends Ev[]
//  ? E[Ev]
//  : never
//: never;

// 2 type Spread<"start" | "stop", EvOrig, EventPayloads> = 
//"start" | "stop" extends start|stop|end
//  ? EvOrig[] extends Ev[]
//  ? E[Ev]
//  : never
//: never;

// 3type Spread<"start" | "stop", EvOrig, EventPayloads> = 
//"start" | "stop" extends start
//  ? EvOrig[] extends Ev[]
//  ? E[Ev]
//  : never
//: never;
//|"start" | "stop" extends stop
//  ? EvOrig[] extends Ev[]
//  ? E[Ev]
//  : never
//: never;
//|"start" | "stop" extends end
//  ? EvOrig[] extends Ev[]
//  ? E[Ev]
//  : never
//: never;

// 3type Spread<"start" | "stop", EvOrig, EventPayloads> = 
//never|never|never