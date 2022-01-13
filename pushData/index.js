const faker = require('faker');
const fs = require('fs')
function generateUsers() {

  let users = []

  for (let id=1; id <= 100; id++) {

    let imageName = faker.image.avatar();
    let title = faker.name.title();
    let description = faker.name.jobType();

    users.push({
        "id": id,
        "image": imageName,
        "title": title,
        "description": description
    });
  }

  return { "data": users }
}

let dataObj = generateUsers();

fs.writeFileSync('../server/db.json', JSON.stringify(dataObj, null, '\t'));