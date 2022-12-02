import fs from "fs-extra";
import zipFolder from "zip-folder";
import { resolve } from "path";

async function generate() {
  console.log("Gerando SCORM packages ;)");
  const path = resolve(__dirname, "../dist_scorm");
  const scorm12_path = resolve(__dirname, "../dist_scorm/scorm12");
  const paths = [path, scorm12_path];
  console.log("Procurando arquivos... 🤔");
  for (let i = 0; i < paths.length; i++) {
    if (!fs.existsSync(paths[i])) {
      fs.mkdirSync(paths[i]);
    } else {
      fs.removeSync(paths[i]);
      fs.mkdirSync(paths[i]);
    }
  }

  // remove server files
  console.log("Excluindo arquivos no servidor local 🤖");

  const server_player = resolve(__dirname, "../dist/server_player");
  const server_player_html = resolve(__dirname, "../dist/scorm12.html");

  try {
    await fs.removeSync(server_player);
    await fs.removeSync(server_player_html);
  } catch (err) {
    console.error(err);
  }

  // Copy APP files
  console.log("Copiando arquivos gerados pelo build... 🤖");
  const app_path = resolve(__dirname, "../dist");
  fs.copySync(app_path, scorm12_path);

  // SCORM 1.2
  const scorm12_schemas_path = resolve(__dirname, "../build/schemas/SCORM_12");
  fs.readdirSync(scorm12_schemas_path).forEach((file) => {
    fs.copySync(scorm12_schemas_path + "/" + file, scorm12_path + "/" + file);
  });

  // Generate SCORM packages
  let nFilesGenerated = 0;
  let success = true;
  function _onZipFileGenerated(fileSuccess) {
    nFilesGenerated++;
    success = success && fileSuccess;
    if (nFilesGenerated === 2) {
      console.log("Tudo certo, agora é só voar ;) 🚀 🤑 ");
    }
  }
  zipFolder(scorm12_path, path + "/scorm12.zip", function (err) {
    if (err) {
      console.log(`SCORM 1.2 falhou para gerar o package. 🤬`);
      console.log(`🧐 O código de erro é esse: ${err}`);
    } else {
      console.log("SCORM 1.2 package gerado com sucesso. 😎 ");
      return _onZipFileGenerated(typeof err === "undefined");
    }
  });
}

export default function projectInformer() {
  return {
    name: "Generate Scorm",
    closeBundle: generate,
  };
}
