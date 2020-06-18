const tagsService = require("../service/TagsService");
let path = new Map();
addTags = (request, response) => {
  let data = request.body;
  console.log(request.body);
  let nameList = [];
  for (let index = 0; index < data.length; index++) {
    const name = data[index].name;
    nameList.push(name);
  }
  tagsService.addTags(nameList, (result) => {
    console.log("controller:", result);

    if (result) {
      //查询id
      for (let index = 0; index < data.length; index++) {
        let subclass = data[index].subclass;
        if (subclass) {
          tagsService.searchTags(data[index].name, (result) => {
            console.log("select_subclass:", result[0].id);
            // response.end();
            if (result) {
              let list = [];
              for (let index = 0; index < subclass.length; index++) {
                //   console.log(subclass[index].name)
                list.push(subclass[index].name);
                // list.push(result[0].id)
              }
              tagsService.addChildrenTags(list,result[0].id, (result) => {
                console.log("success");
              });
            }
          });
        }
      }
    }
    response.end();
  });
  console.log(nameList);
};
path.set("/addTags", addTags);
searchTags = (request, response) => {
  tagsService.searchTags(name, (result) => {
    console.log("controller:", result);
    response.end();
  });
};
path.set("/searchTags", searchTags);
module.exports.path = path;
