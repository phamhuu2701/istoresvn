const Street = require("../../models/street.model");
const StreetDao = require("../../dao/street.dao");
const District = require("../../models/district.model");
const DistrictDao = require("../../dao/district.dao");

const streets = [
    "Bác Ái",
    "Cầu Bình Đức",
    "Chu Mạnh Trinh",
    "Chương Dương",
    "Công Lý",
    "Dân Chủ",
    "Đặng Văn Bi",
    "Đoàn Công Hớn",
    "Đoàn Kết",
    "Độc Lập",
    "Đường Tỉnh 43",
    "Đường Tỉnh 743",
    "Dương Văn Cam",
    "Einstein",
    "Gò Dưa",
    "Hiệp Bình",
    "Hồ Văn Tư",
    "Hòa Bình",
    "Hoàng Diệu",
    "Hồng Đức",
    "Kha Vạn Cân",
    "Khổng Tử",
    "Lê Thị Hoa",
    "Lê Văn Chí",
    "Linh Trung",
    "Lương Khải Siêu",
    "Ngô Chí Quốc",
    "Nguyễn Khuyến",
    "Nguyễn Thị Nhung",
    "Nguyễn Văn Bá",
    "Pasteur",
    "Phạm Văn Đồng",
    "Phú Châu",
    "Quốc Lộ 13",
    "Quốc Lộ 1A",
    "Quốc Lộ 1K",
    "Tam Bình",
    "Tam Châu",
    "Tam Hà",
    "Thống Nhất",
    "Tô Ngọc Vân",
    "Tô Vĩnh Diện",
    "Vận Hành",
    "Việt Thắng",
    "Võ Văn Ngân",
    "Xa Lộ Hà Nội"
];

module.exports.createDefaultCollection = async () => {
    const streetsArray = await StreetDao.find();
    if (streetsArray.length <= 0) {
        console.log("Street collection is empty.");

        const districts = await DistrictDao.find();
        if (districts.length > 0) {
            const thuDucDistrict = await DistrictDao.findOneByName("Thủ Đức");

            streets.map( street => {
                const newStreet = new Street({
                    name: street,
                    district: thuDucDistrict
                });

                // console.log(newStreet);
                StreetDao.save(newStreet);
            });
            console.log("Default Street collection created.");
        }
    } else {
        console.log("Street collection existed: ", streetsArray.length, "/46");
    }
};
