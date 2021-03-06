const tagsService = require("../service/TagsService");
let path = new Map();
addTags = (request, response) => {
  let data = request.body;
  // console.log(request.body);
  for (let index = 0; index < data.length; index++) {
    const childrenData = data[index];
    const name = data[index].name;
    const herf = data[index].herf;
    tagsService.searchTagsNameIsTrue(name, (result) => {
      if (!result[0].count) {
        console.log(name);
        tagsService.addTags(name, herf, (result) => {
          console.log("controller:", result);
          if (result && childrenData.subclass) {
            //查询id
            console.log(childrenData.subclass);
            let subclass = childrenData.subclass;
            tagsService.searchTagsIdWithName(childrenData.name, (result) => {
              if (result) {
                for (let index = 0; index < subclass.length; index++) {
                  tagsService.addChildrenTags(
                    subclass[index].name,
                    subclass[index].herf,
                    result[0].id,
                    (result) => {
                      console.log("success");
                    }
                  );
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
                      subclass[index].herf,
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
                id: resultC[i].id,
                name: resultC[i].children_tags_name,
                herf: resultC[i].herf,
              });
            }
          }
        }
      }
      response.write(JSON.stringify(data));
      response.end();
    });
  });
};
path.set("/searchTags", searchTags);
deleteTags = (req, res) => {
  if (req.body.subclass) {
    tagsService.deleteHasChildrenTags(req.body.id, (result) => {
      res.json({
        code: 200,
        data: {
          message: "success",
        },
      });
      res.end();
    });
  } else {
    let id = req.body.id;
    if (req.body.isChildren) {
      tagsService.deleteChildrenTags(id, (result) => {
        res.json({
          code: 200,
          data: {
            message: "success",
          },
        });
        res.end();
      });
    } else {
      tagsService.deleteTags(id, (result) => {
        res.json({
          code: 200,
          data: {
            message: "success",
          },
        });
        res.end();
      });
    }
  }
};
path.set("/deleteTags", deleteTags);
module.exports.path = path;
