const SearchKey = require("../../models/searchKey.model");
const SearchKeyDao = require("../../dao/searchKey.dao");

const searchKeys = [
    { value: "dien thoai" },
    { value: "iphone" },
    { value: "samsung" },
    { value: "nokia" },
    { value: "xiaomi" },
    { value: "nokia" },
    { value: "cafe" },
    { value: "tra" },
    { value: "sua" },
    { value: "tra sua" }
];

module.exports.createDefaultCollection = async () => {
    const searchKeyArray = await SearchKeyDao.find();
    if (searchKeyArray.length <= 0) {
        console.log("SearchKey collection is empty.");

        searchKeys.map(searchKey => {
            const num = Math.floor(Math.random() * 1000);
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

            const searchKeyNew = new SearchKey({
                value: searchKey.value,
                count: count
            });
            // console.log(searchKeyNew);
            SearchKeyDao.save(searchKeyNew);
        });
        console.log("Default SearchKey collection created.");
    } else {
        console.log(
            "SearchKey collection existed: ",
            searchKeyArray.length,
            "/",
            searchKeys.length
        );
    }
};
