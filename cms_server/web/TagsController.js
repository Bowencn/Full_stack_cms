const tagsService = require("../service/TagsService");
let path = new Map();
addTags = (request, response) => {
  let data = request.body;
  // console.log(request.body);
  for (let index = 0; index < data.length; index++) {
    const childrenData = data[index];
    const name = data[index].name;
    tagsService.searchTagsNameIsTrue(name, (result) => {
      // console.log(!result[0].count,childrenData)
      if (!result[0].count) {
        console.log(name);
        tagsService.addTags(name, (result) => {
          console.log("controller:", result);
          if (result && childrenData.subclass) {
            //查询id
            console.log(childrenData.subclass);
            let subclass = childrenData.subclass;
            tagsService.searchTagsIdWithName(childrenData.name, (result) => {
              console.log("select_subclass:", result[0].id);
              // response.end();
              if (result) {
                for (let index = 0; index < subclass.length; index++) {
                  console.log(subclass[index].name, result[0].id);

                  tagsService.addChildrenTags(
                    subclass[index].name,
                    result[0].id,
                    (result) => {
                      console.log("success");
                    }
                  );
                  // list.push(subclass[index].name);
                  // list.push(result[0].id)
                }
              }
            });
          }
          response.end();
        });
      } else if (childrenData.subclass) {
        console.log(name);
        let subclass = childrenData.subclass;
        tagsService.searchTagsIdWithName(childrenData.name, (result) => {
          console.log("select_subclass:", result[0].id);
          if (result) {
            for (let index = 0; index < subclass.length; index++) {
              let resultId = result[0].id;
              console.log(subclass[index].name, result[0].id);
              tagsService.searchChildrenTagsNameIsTrue(
                subclass[index].name,
                (result) => {
                  if (!result[0].count) {
                    tagsService.addChildrenTags(
                      subclass[index].name,
                      resultId,
                      (result) => {
                        console.log("success");
                      }
                    );
                  }
                }
              );
            }
          }
        });
        response.end();
      }
    });
  }
};
path.set("/addTags", addTags);
searchTags = (request, response) => {
  tagsService.searchTags((result) => {
    tagsService.searchChildrenTags((resultC) => {
      let data = result;
      for (let index = 0; index < data.length; index++) {
        for (let i = 0; i < resultC.length; i++) {
          if (data[index].id === resultC[i].father_id) {
            data[index].subclass = [];
          }
        }
        if (data[index].subclass) {
          for (let i = 0; i < resultC.length; i++) {
            if (data[index].id === resultC[i].father_id) {
              data[index].subclass.push({
                name: resultC[i].children_tags_name,
              });
            }
          }
        }
      }
      
      response.write(JSON.stringify(data.reverse()));
      response.end();
    });
  });
};
path.set("/searchTags", searchTags);
module.exports.path = path;
