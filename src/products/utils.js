const excelGenerator = (products, name, res) =>{
    const excel = require("excel4node");

    products = products.map(product =>{
        id = product._id.toString();
        delete product._id;

        return {
            id,
            ...product
        }

    });

    const workBook = new excel.Workbook();
    const workSheet = workBook.addWorksheet('Inventario');
    
    for(let i = 1; i <= products.length; i++){
        
        for(let j = 1; j <= Object.values(products[0]).length ; j++){

            const data = Object.values(products[i - 1])[j - 1];
            
            if(typeof data == "string"){
                workSheet.cell(i, j).string(data);
            }else {
                workSheet.cell(i, j).number(data);
            }

        }

    }

    workBook.write(`${name}.xlsx`, res);

}

module.exports.ProductsUtil = {
    excelGenerator : excelGenerator
}