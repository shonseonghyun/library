export const getFilePath= (filePath:string,newFileName:string)=>{
    const idx = filePath.indexOf("img");
    const reactFilePath = filePath.substring(idx)+"/"+newFileName;
    return reactFilePath;
}

export const replaceDt=(dt:string)=>{
    if(dt==null || dt==undefined){
        return null;
    }
    return dt.replace(/[^0-9]/g, '')
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");
}

export const replaceTm=(tm:string)=>{
    if(tm==null || tm==undefined){
        return null;
    }
    return tm.replace(/[^0-9]/g, "")
        .replace(/^(\d{2})(\d{2})(\d{2})$/, `$1:$2:$3`)
}

export const replaceTel=(tel:string)=>{
    if(tel==null || tel==undefined){
        return null;
    }
    return tel.replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}