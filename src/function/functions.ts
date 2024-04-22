export const getFilePath= (filePath:string,newFileName:string)=>{
    const idx = filePath.indexOf("img");
    const reactFilePath = filePath.substring(idx)+"/"+newFileName;
    return reactFilePath;
}