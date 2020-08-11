const ProductDao = require("../../dao/product.dao");

module.exports.updateProductsView = async () => {
    const products = await ProductDao.find();
    if (products.length > 0) {
        products.map((product, key) => {
            if(product.viewsCount.length > 0){
                // console.log("Product.viewsCount documents exists");
            }
            else{
                const num = Math.floor(Math.random() * 100);
                let count = [];
    
                const currentDateMain = new Date();
                for (let i = 0; i < num; i++) {
                    const y = 2017 + Math.floor(Math.random() * 4);
                    let m = 0;
                    let d = 0;
                    if(y < currentDateMain.getFullYear()){
                        m = Math.floor(Math.random() * 11);
                        d = Math.floor(Math.random() * 28);
                    }
                    else{
                        m = Math.floor(Math.random() * currentDateMain.getMonth());
                        if(m === currentDateMain.getMonth()){
                            d = Math.floor(Math.random() * currentDateMain.getDate());
                        }
                        else{
                            d = Math.floor(Math.random() * 28);
                        }
                    }
                    let currDate = new Date();
                    currDate.setFullYear(y);
                    currDate.setMonth(m);
                    currDate.setDate(d);
                    count.push(currDate);
                }

                // console.log(views);
                product.viewsCount = count;
                // console.log(product);
                ProductDao.update(product);
            }
        });
    } else {
        console.log("Product collection empty");
    }
};
