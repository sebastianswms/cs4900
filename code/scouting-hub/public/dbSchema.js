const schemas = [
  {
    tableName: "layouts",
    columns: [
      { name: "id", type: "TEXT PRIMARY KEY" },
      { name: "name", type: "TEXT UNIQUE" },
      { name: "year", type: "TEXT" },
      { name: "eventCode", type: "TEXT" },
      { name: "teamNumber", type: "TEXT" },
      { name: "teamName", type: "TEXT" },
      { name: "categories", type: "TEXT" }, //stringified data
      { name: "subCategories0", type: "TEXT" }, //stringified data
      { name: "subCategories1", type: "TEXT" }, //stringified data
      { name: "subCategories2", type: "TEXT" }, //stringified data
      { name: "subCategories3", type: "TEXT" }, //stringified data
      { name: "subCategories4", type: "TEXT" }, //stringified data
      { name: "headers0", type: "TEXT" }, //stringified data
      { name: "headers1", type: "TEXT" }, //stringified data
      { name: "headers2", type: "TEXT" }, //stringified data
      { name: "headers3", type: "TEXT" }, //stringified data
      { name: "headers4", type: "TEXT" }, //stringified data
    ],
    constraints: "",
  },
  {
    tableName: "matches",
    columns: [
      { name: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "year", type: "TEXT" },
      { name: "district", type: "TEXT" },
      { name: "event_code", type: "TEXT" },
      { name: "tournament_level", type: "TEXT" },
      { name: "match_number", type: "TEXT" },
      { name: "red1", type: "TEXT" },
      { name: "red2", type: "TEXT" },
      { name: "red3", type: "TEXT" },
      { name: "blue1", type: "TEXT" },
      { name: "blue2", type: "TEXT" },
      { name: "blue3", type: "TEXT" },
    ],
    constraints: `,CONSTRAINT unique_match UNIQUE (year,district,event_code,tournament_level,match_number)`,
  },
  {
    tableName: "scores",
    columns: [
      { name: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "layoutID", type: "TEXT" },
      { name: "year", type: "TEXT" },
      { name: "eventCode", type: "TEXT" },
      { name: "teamNumber", type: "TEXT" },
      { name: "teamName", type: "TEXT" },
      { name: "data0", type: "TEXT" }, //stringified data
      { name: "data1", type: "TEXT" }, //stringified data
      { name: "data2", type: "TEXT" }, //stringified data
      { name: "data3", type: "TEXT" }, //stringified data
      { name: "data4", type: "TEXT" }, //stringified data
    ],
    constraints: `,CONSTRAINT unique_scores UNIQUE (layoutID,year,eventCode,teamNumber, teamName)`,
  },
];

module.exports = schemas;
