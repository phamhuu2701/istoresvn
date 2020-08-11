const Store = require("../../models/store.model");
const StoreDao = require("./../../dao/store.dao");

const UserDao = require("../../dao/user.dao");
const CityDao = require("../../dao/city.dao");
const DistrictDao = require("../../dao/district.dao");
const StreetDao = require("../../dao/street.dao");
const StoreCategoryDao = require("../../dao/storeCategory.dao");

const stores = [
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.75620759999993, 10.8510813] },
        phone: "01696696969",
        email: "eshop@gmail.com",
        name: "E-Shop",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { typ: "Point", coordinates: [106.76565989999995, 10.8450625] },
        phone: "01696696970",
        email: "yanshop@gmail.com",
        name: "Yan-Shop",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.76123200000006, 10.853104] },
        phone: "01696696971",
        email: "hangquan@gmail.com",
        name: "HOÀNG QUÂN",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.75558139999998, 10.8378986] },
        phone: "01696696972",
        email: "hoanganh@gmail.com",
        name: "CỬA HÀNG HOANG ANH",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.76007789999994, 10.841817] },
        phone: "01696696973",
        email: "thientrang@gmail.com",
        name: "THIÊN TRANG",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.74999130000003, 10.8777725] },
        phone: "01696696974",
        email: "tuanlinh@gmail.com",
        name: "CỬA HÀNG ĐIỆN - ĐIỆN TỬ TUẤN LINH",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.76760100000001, 10.843555] },
        phone: "01696696975",
        email: "lannhu@gmail.com",
        name: "Lan Như",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.77706009999997, 10.8574787] },
        phone: "01696696976",
        email: "lamtuan@gmail.com",
        name: "Cửa hàng Lâm Tuấn",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.80380809999997, 10.8699184] },
        phone: "01696696977",
        email: "hongnhung@gmail.com",
        name: "Hồng Nhung Store",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.698801, 10.7787659] },
        phone: "01696696978",
        email: "canhtoanshop@gmail.com",
        name: "Cảnh Toàn Super Shop",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: false
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.75620759999993, 10.8510813] },
        phone: "01696696979",
        email: "lazada@gmail.com",
        name: "LAZADA",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: true,
            url: "https://www.lazada.vn/"
        },
        template: 1
    },    
    {
        houseNumber: "12",
        location: { type: "Point", coordinates: [106.76565989999995, 10.8450625] },
        phone: "01696696980",
        email: "tiki@gmail.com",
        name: "TIKI",
        description:
            "Chuyên cung cấp các thiết bị điện, điện tử, thiết bị thông minh chất lượng chính hãng, giá cả hợp lý.",
        website: {
            hasWebsite: true,
            url: "https://tiki.vn/"
        },
        template: 1
    }
];

module.exports.createDefaultCollection = async () => {
    const storeArrays = await StoreDao.find();
    if (storeArrays.length <= 0) {
        console.log("Store collection is empty.");

        const storeCategory = await StoreCategoryDao.findOneByName(
            "Siêu thị điện máy thông minh"
        );
        // console.log(storeCategory);

        const user1 = await UserDao.findOneByEmail("user10@gmail.com");
        const user2 = await UserDao.findOneByEmail("user10@gmail.com");
        const user3 = await UserDao.findOneByEmail("user10@gmail.com");
        const users = [];
        users.push(user1);
        users.push(user2);
        users.push(user3);
        // console.log(user);

        const city = await CityDao.findOneByName("Hồ Chí Minh");
        // console.log(city);

        const district = await DistrictDao.findOneByName("Thủ Đức");
        // console.log(district);

        const street1 = await StreetDao.findOneByName("Võ Văn Ngân");
        const street2 = await StreetDao.findOneByName("Bác Ái");
        const street3 = await StreetDao.findOneByName("Chương Dương");
        const street4 = await StreetDao.findOneByName("Công Lý");
        const street5 = await StreetDao.findOneByName("Đặng Văn Bi");
        const street6 = await StreetDao.findOneByName("Độc Lập");
        const street7 = await StreetDao.findOneByName("Einstein");
        const street8 = await StreetDao.findOneByName("Lê Văn Chí");
        const street9 = await StreetDao.findOneByName("Linh Trung");
        const street10 = await StreetDao.findOneByName("Pasteur");
        const streets = [];
        streets.push(street1);
        streets.push(street2);
        streets.push(street3);
        streets.push(street4);
        streets.push(street5);
        streets.push(street6);
        streets.push(street7);
        streets.push(street8);
        streets.push(street9);
        streets.push(street10);
        // console.log(street);

        if (storeCategory != null && city != null 
            && district != null) {
            stores.map((store, key) => {
                let storeNew = new Store({
                    user: users[key%3],
                    storeCategory: storeCategory,
                    city: city,
                    district: district,
                    street: streets[key%10],
                    houseNumber: store.houseNumber,
                    location: store.location,
                    phone: store.phone,
                    email: store.email,
                    name: store.name,
                    description: store.description,
                    website: store.website,
                    template: store.template
                });

                // console.log(storeNew);
                StoreDao.save(storeNew);
            });
            console.log("Default Store collection created.");
        }

    } else {
        console.log("Store collection existed: ", storeArrays.length, "/12");
    }
};
