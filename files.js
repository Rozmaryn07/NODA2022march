const fs = require('fs').promises;
const path = require('path');


const Sort = async (readFolder, gendrer, changeFolder) => {
    const FolderPath = path.join(__dirname, readFolder);
    const Places = await fs.readdir(FolderPath);

  for (const place of Places) {
      const PathFile = path.join(FolderPath, place);
      const data = await fs.readFile(PathFile);
      const FolderEnd = path.join(__dirname, changeFolder, place);

      const user = JSON.parse(data.toString());

      if (user.gender !== gendrer){
         await fs.rename(PathFile, FolderEnd );
      }

  }
}
Sort('boys','male','girls' );
Sort('girls',  'female', 'boys')


//       fs.stat(`./boys/${file}`).then(info => {
//       if (!info.isFile()) {
//         return;
//       }
//
//       fs.readFile(`./boys/${file}`).then(fileBuffer => {
//           if({gender: "female"}){
//               fs.rename(`./boys/${file}`, `./girls/${file}`)}
//
//           console.log(fileBuffer.toString());
//
//       })
//     })
// }



