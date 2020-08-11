const Product = require("../../models/product.model");
const ProductDao = require("../../dao/product.dao");
const ProductCategoryDao = require("../../dao/productCategory.dao");
const StoreDao = require("./../../dao/store.dao");

const imageUrls = [
    "https://cdn.tgdd.vn/Files/2018/08/27/1112860/66_800x450.jpg",
    "https://cdn.tgdd.vn/Files/2018/04/30/1085368/apple-iphone-x-2_800x450.jpg",
    "https://didongviet.vn/blog/wp-content/uploads/2019/06/banner-top-6-didongviet.jpg",
    "https://cdn.tgdd.vn/Files/2019/04/17/1161273/smartphone_1280x720-800-resize.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcsnuzcRPVRiNrsBaG3MjoFk7RD0X5ki2mX32GqhoDy6VcWal&s",
    "https://cdn.mediamart.vn/Upload/images/Untitled-2.jpg",
    "https://vvm.com.vn/pic/News/images/636270273016462709.jpg",
    "https://didongviet.vn/blog/wp-content/uploads/2019/06/banner-mate-20x-5g-didongviet.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs82uq3of1GoyflUFGE6vN2Yk9QvrzM0qLxdMlj7Gj_hZRnDK8&s",
    "https://vnn-imgs-f.vgcloud.vn/2019/08/07/16/dien-thoai-thong-minh-vsmart-the-he-2-chuan-bi-len-ke.jpg",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lQkJdR-5IcXd4jcXlfrhhaWUrNkPPou-JvUPEydXtFE60DxIaw&s",
    "https://cellphones.com.vn/sforum/wp-content/uploads/2019/11/smartphone-ODM-Samsung-1.jpg",
    "https://vnreview.vn/image/19/90/51/1990510.jpg?t=1569661849011",
    "https://i-sohoa.vnecdn.net/2019/11/15/10-smartphone-android-tot-nhat-1573807612_660x0.png",
    "https://cdn.tgdd.vn/Products/Images/42/205773/TimerThumb/samsung-galaxy-a10s-green-thumb.jpg",
    "https://znews-photo.zadn.vn/w660/Uploaded/OFH_oazszstq/2018_03_16/asuszenfone5z16.jpg",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2020/01/airpod2-5-8.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR494brenitaYjD3qEOcVUjh__YnFVNAedDK-RrfTawhak42Gha&s",
    "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/small_image/450x/9df78eab33525d08d6e5fb8d27136e95/6/3/637060410960077373_xiaomi-redmi-note-8-xanh-1.png",
    "https://didongviet.vn/pub/media/catalog/product//s/a/samsung-galaxy-fold-silver-didongviet_2_2.jpg",

    "https://www.fedexvietnam.net/wp-content/uploads/2019/11/chuyen-phat-nhanh-smartphone-trung-quoc-ve-bac-giang-chi-phi-thap.jpg",
    "https://www.fedexvietnam.net/wp-content/uploads/2019/11/chuyen-phat-nhanh-smartphone-trung-quoc-ve-bac-ninh-chi-phi-thap.jpg",
    "https://tintuc.viettelstore.vn/wp-content/uploads/2019/07/dien-thoai-5G-1.jpg",
    "https://didongviet.vn/pub/media/catalog/product//s/a/samsung-galaxy-s8-64gb-han-quoc-didongviet.jpg",
    "https://genknews.genkcdn.vn/zoom/480_300/2020/1/6/microsoft-surface-duo-tablet-100812772-large-1578310264866943226381-crop-15783102727261943104332.jpg",
    "https://i-sohoa.vnecdn.net/2019/10/30/HHHH3037-1548671184-680x0-3019-1572445760.jpg",
    "https://cdn.24h.com.vn/upload/4-2018/images/2018-11-25/1543155923-699-diem-danh-smartphone-co-man-hinh-lon-nhat-thi-truong-mate20x-1542947964-width660height495.jpg",
    "https://cdn.tgdd.vn/Files/2019/04/07/1159313/4_800x450.jpg",
    "https://image.thanhnien.vn/768/uploaded/ngocthanh/2019_12_13/anh-1_bai_man-hinh-gap_rily.jpg",
    "https://image.businessinsider.com/5dcd78b93afd3740613de824?width=1100&format=jpeg&auto=webp"
];

const products = [
    {
        name: `Điện Thoại Samsung Galaxy M10 (16GB/2GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Thiết kế: Nguyên khối, mặt kính cong 2.5D
        
        Màn hình: LCD 6.2" HD+, Infinity V Display
        
        Camera Sau: 13 MP và 5 MP (2 camera)
        
        Camera Trước: 5 MP
        
        CPU: Samsung Exynos 7870, 8 nhân Cortex A53 @1.6 GHz
        
        Bộ Nhớ: 16GB
        
        RAM: 2GB
        
        Tính năng: Mở khóa bằng vân tay, Đèn pin, Chặn cuộc gọi, Chặn tin nhắn`,
        price: 2390000,
        saleoff: 32,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại OPPO F11 Pro (6GB/64GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Miễn phí giao hàng toàn quốc
        
        Màn hình: LTPS LCD, 6.53", Full HD+ (1080 x 2340 Pixels)
        
        Camera Trước/Sau: 16MP/48MP + 5MP (2 camera)
        
        CPU: MediaTek Helio P70 8 nhân
        
        Bộ Nhớ: 64GB
        
        RAM: 6GB
        
        SIM tương thích: 2 Nano SIM
        
        Tính năng: Mở khóa bằng vân tay, Mở khóa bằng khuôn mặt`,
        price: 5995000,
        saleoff: 29,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại OPPO F7 (64GB/4GB) - Hàng Chính Hãng`,
        description: `Chính hãng, nguyên seal, mới 100%, chưa active

        Miễn phí giao hàng toàn quốc
        
        Thiết kế nguyên khối kim loại
        
        Màn hình: 6.23 inch
        
        Camera Trước/Sau: 16MP/25MP
        
        CPU: MediaTek P60
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        SIM: 2 Nano SIM
        
        Tính năng: Mở khóa bằng khuôn mặt, mở khóa bằng vân tay`,
        price: 3690000,
        saleoff: 54,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện thoại Vsmart Live (64GB/6GB) - Hàng chính hãng`,
        description: `Chính hãng, nguyên seal, mới 100%, chưa Active

        Màn hình: AMOLED, 6.2", Full HD+
        
        Camera trước: 20 MP
        
        Camera sau: Chính 48 MP & Phụ 8 MP, 5 MP
        
        Bộ vi xử lý: Qualcomm Snapdragon 675 8 nhân 64-bit
        
        Bộ nhớ ROM: 64GB
        
        RAM: 6GB
        
        Sim tương thích: 2 Nano SIM, Hỗ trợ 4G
        
        Tính năng: Mở khoá vân tay dưới màn hình`,
        price: 3299000,
        saleoff: 58,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy M30s (64GB/4GB) - Hàng Chính Hãng`,
        description: `Hàng chính hãng Samsung Việt Nam, Nguyên seal, Mới 100%, Chưa Active

        Màn hình: Super AMOLED, 6.4", Full HD+ (1080 x 2280 Pixels)
        
        Camera Sau : 48 MP, 8 MP và 5 MP (3 camera)
        
        Camera Trước: 16 MP
        
        CPU: Exynos 9611 8 nhân
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        Dung lượng pin 6000 mAh
        
        Tính năng: Mở khóa bằng vân tay, Dolby Audio, Đèn pin, Sạc pin nhanh, Chặn cuộc gọi, Chặn tin nhắn`,
        price: 4900000,
        saleoff: 29,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Vsmart Joy 2+ (Hàng Chính Hãng)`,
        description: `Màn hình: IPS LCD, 6.2", HD+

        Hệ điều hành: Android 9.0 (Pie)
        
        Camera sau: Chính 13 MP & Phụ 5 MP
        
        Camera trước: 8 MP
        
        CPU: Qualcomm Snapdragon 450 8 nhân 64-bit
        
        RAM: 2 GB
        
        Bộ nhớ trong: 32 GB
        
        Thẻ nhớ: MicroSD, hỗ trợ tối đa 128 GB
        
        Thẻ SIM: 2 Nano SIM, Hỗ trợ 4G
        
        Dung lượng pin: 4500 mAh, có sạc nhanh`,
        price: 1890000,
        saleoff: 37,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Mi 9 Lite (Mi CC9 Global Version) (6GB / 64GB) - Hàng Chính Hãng`,
        description: `Xiaomi Mi 9 Lite là phiên bản quốc tế của chiếc Mi CC9 ra mắt trong tháng 7/2019

        Mới, Chính hãng, Nguyên seal, Chưa active
        
        Miễn phí giao hàng toàn quốc
        
        Màn hình: Super AMOLED, 6.39", Full HD+
        
        Hệ điều hành: Android 9.0 (Pie)
        
        Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP
        
        Camera trước: 32 MP
        
        CPU: Snapdragon 710 8 nhân 64-bit
        
        RAM: 6 GB
        
        Bộ nhớ trong: 64GB
        
        Thẻ nhớ: MicroSD, hỗ trợ tối đa 256 GB
        
        Thẻ SIM: 2 SIM Nano (SIM 2 chung khe thẻ nhớ)
        
        Dung lượng pin: 4030 mAh`,
        price: 4989000,
        saleoff: 33,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy A50 (64GB/4GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Thiết kế: Nguyên khối, màn hình vô cực
        
        Màn hình: 6.4” FHD+ Super AMOLED (1080x2340)
        
        Camera Sau : 5MP (F2.2) + 25MP (F1.7) + 8MP (F2.2) ultra wide
        
        Camera Trước: 25MP (F2.0)
        
        CPU: Exynos 9610 Octa Core 2.3GHz
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        Tính năng: Cảm biến vân tay dưới màn hình, nhận diện khuôn mặt...`,
        price: 6550000,
        saleoff: 6,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Redmi Note 7 (3GB/32GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Phiên bản quốc tế có tiếng Việt
        
        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế: Nguyên khối, Khung kim loại, Mặt lưng kính
        
        Màn hình: 6.3" Full HD+ (1080 x 2340 Pixels)
        
        Camera Sau: 48 MP và 5 MP (2 camera)
        
        Camera Trước: 13MP
        
        CPU: Qualcomm SDM660 Snapdragon 660 8 nhân
        
        Bộ Nhớ: 32GB
        
        RAM: 3GB
        
        Tính năng: Mở khóa bằng vân tay, Mở khóa bằng khuôn mặt`,
        price: 3269000,
        saleoff: 18,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 11 64GB - Hàng Chính Hãng`,
        description: `Nguyên seal, Mới 100%, Chưa Active

        Công nghệ màn hình: IPS LCD
        
        Độ phân giải: 828 x 1792 pixels
        
        Màn hình rộng: 6.1 inches
        
        Camera sau: 12 MP + 12 MP
        
        Quay phim: 2160p@24/30/60fps, 1080p@30/60/120/240fps, HDR, stereo sound rec.
        
        Camera trước: 12 MP, f/2.2
        
        Hệ điều hành: iOS 13
        
        Chipset (CPU): Apple A13 Bionic 6 nhân
        
        RAM: 4 GB
        
        Bộ nhớ trong: 64GB
        
        Dung lượng pin: 3110 mAh
        
        SIM: 1 Nano SIM , 1 esim
        
        Mã Part: VN/A`,
        price: 20990000,
        saleoff: 5,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy Note 10 Plus (256GB/12GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Mới 100%, Đã kích hoạt bảo hành điện tử

        Công nghệ màn hình: Dynamic AMOLED
        
        Độ phân giải: 3040 x 1440 (Quad HD+)
        
        Màn hình rộng: 6.8 inch
        
        Mặt kính cảm ứng: Corning Gorilla Glass 6
        
        Camera Sau: 12.0 MP + 16.0 MP + 12.0 MP + VGA
        
        Camera Trước: 10.0 MP
        
        CPU: Exynos 9825 8 nhân 64-bit
        
        Bộ Nhớ: 256GB
        
        RAM: 12GB
        
        Hỗ trợ thẻ nhớ: MicroSD, hỗ trợ tối đa 512 GB
        
        Bảo mật nâng cao Mở khóa bằng khuôn mặt, Quét mống mắt, Mở khoá vân tay dưới màn hình`,
        price: 18480000,
        saleoff: 32,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện thoại Nokia 6.1 Plus - Hàng Chính Hãng`,
        description: `Mới 100%

        Miễn phí giao hàng toàn quốc
        
        Thiết kế nguyên khối trẻ trung, hiện đại
        
        Màn hình: tai thỏ 5.8"
        
        Camera Trước/Sau: 16 MP và 5 MP (2 camera)
        
        CPU: Qualcomm Snapdragon 636 8 nhân
        
        Bộ nhớ trong: 64GB
        
        RAM: 4GB
        
        SIM tương thích: 2 Nano SIM
        
        Tính năng: Đèn pin, chặn tin nhắn, chặn cuộc gọi`,
        price: 3490000,
        saleoff: 47,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Mi 8 Lite (4GB / 64GB) - Hàng Chính Hãng`,
        description: `Sản phẩm Chính hãng, Mới 100%, Nguyên seal, Chưa Active

        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối
        
        Màn hình: 6.26 inch IPS LCD
        
        Camera Trước: 24MP
        
        Camera Sau: 16 MP và 5 MP (2 camera)
        
        CPU: Qualcomm SDM660 Snapdragon 660
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        SIM tương thích: 2 Nano SIM`,
        price: 3790000,
        saleoff: 43,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Meizu C9 - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%, Chưa active

        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối, Mặt lưng nhựa
        
        Màn hình: 5.45 inch HD (1440 x 720 Pixels)
        
        Camera Trước: 8MP
        
        Camera Sau: 13MP
        
        CPU: 4 nhân 2.0GHz
        
        Bộ Nhớ: 16GB
        
        RAM: 2GB
        
        SIM tương thích: 2 Nano SIM
        
        Tính năng: Mở khóa bằng khuôn mặt`,
        price: 1190000,
        saleoff: 48,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy A50s (64GB/4GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Mới 100%, Đã kích hoạt bảo hành điện tử

        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế mặt cắt kim cương
        
        Màn hình: 6.4” Super AMOLED, chuẩn điện ảnh 19.5:9 Infinity-U FHD+
        
        Camera Sau : 48MP (F2.0) + 5MP (F2.2) + 8MP (F2.2)
        
        Camera Trước: 32MP (F2.0)
        
        CPU: Exynos 9610 Octa Core 2.3GHz
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        Thẻ nhớ tối đa tới: 512GB
        
        Pin: 4000 mAh
        
        Sạc nhanh siêu tốc 15W
        
        Tính năng: Nhận Diện Khuôn Mặt, Quà tặng Galaxy
        
        Smart Switch, Dual Messenger, Thư Mục Bảo
        
        Mật, Bảo mật vân tay dưới màn hình`,
        price: 4790000,
        saleoff: 39,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Redmi 7 (2GB/16GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%

        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế: Nguyên khối
        
        Màn hình: 6.26" HD+ (720 x 1520 Pixels)
        
        Camera Sau: Chính 12 MP & Phụ 5 MP
        
        Camera Trước: 8 MP
        
        CPU: Qualcomm Snapdragon 632 8 nhân 64-bit
        
        Bộ Nhớ: 16GB
        
        RAM: 2GB
        
        Tính năng: Mở khóa bằng vân tay, Mở khóa bằng khuôn mặt`,
        price: 2190000,
        saleoff: 27,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Nokia 3.1 Plus (32GB/3GB) - Hàng Chính Hãng`,
        description: `Sản phẩm Chính hãng, Mới 100%, Nguyên seal, Chưa Active

        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Màn hình: 6.2 inch IPS LCD, HD+ (720 x 1440 Pixels)
        
        Camera Trước: 8 MP
        
        Camera Sau: 13 MP + 2 MP (Camera kép)
        
        CPU: MediaTek MT6762 8 nhân 64-bit (Helio P22)
        
        Bộ Nhớ: 32GB
        
        RAM: 3GB
        
        SIM: 2 Nano SIM
        
        Tính năng: Chụp ảnh làm đẹp bằng trí tuệ nhân tạo, Chụp ảnh xóa phông, Mở khóa nhận diện khuôn mặt`,
        price: 2390000,
        saleoff: 40,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Redmi Note 7 (4GB/64GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế: Nguyên khối, Khung kim loại, Mặt lưng kính
        
        Màn hình: 6.3" Full HD+ (1080 x 2340 Pixels)
        
        Camera Sau: 48 MP và 5 MP (2 camera)
        
        Camera Trước: 13MP
        
        CPU: Qualcomm SDM660 Snapdragon 660 8 nhân
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        Tính năng: Mở khóa bằng vân tay, Mở khóa bằng khuôn mặt`,
        price: 4450000,
        saleoff: 11,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 11 Pro Max 256GB - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%, Chưa active

        Mã part: VN/A
        
        Thiết kế: Nguyên khối
        
        Màn hình: OLED (Super Retina XDR), 6.5 inch, 2688 x 1242 pixels
        
        Camera Trước/Sau: 12MP / 12MP + 12MP + 12MP
        
        CPU: Apple A13 Bionic (7 nm+)
        
        Bộ Nhớ: 256 GB
        
        RAM: 4GB
        
        SIM: 1 Nano SIM + 1 esim
        
        Tính năng: Chống nước, chống bụi, Face ID, Sạc pin nhanh`,
        price: 35490000,
        saleoff: 7,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy A50s (64GB/4GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế mặt cắt kim cương
        
        Màn hình: 6.4” Super AMOLED, chuẩn điện ảnh 19.5:9 Infinity-U FHD+
        
        Camera Sau: 48MP (F2.0) + 5MP (F2.2) + 8MP (F2.2)
        
        Camera Trước: 32MP (F2.0)
        
        CPU: Exynos 9610 Octa Core 2.3GHz
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        Thẻ nhớ tối đa tới: 512GB
        
        Pin: 4000 mAh
        
        Sạc nhanh siêu tốc 15W
        
        Tính năng: Nhận Diện Khuôn Mặt, Quà tặng Galaxy
        
        Smart Switch, Dual Messenger, Thư Mục Bảo
        
        Mật, Bảo mật vân tay dưới màn hình`,
        price: 4890000,
        saleoff: 30,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 7 Plus - Hàng Chính Hãng VN/A`,
        description: `Chính hãng, nguyên seal, mới 100%

        Thiết kế: Nguyên khối, mặt kính cong 2.5D
        
        Màn hình: 5.5 inch, Full HD (1080 x 1920 pixels)
        
        Camera Trước/Sau: 7MP/ 2 x 12MP
        
        CPU: Apple A10 Fusion 4 nhân 64-bit
        
        Bộ Nhớ: Tùy chọn 32GB / 128GB
        
        RAM: 3GB
        
        Chống nước, chống bụi tiêu chuẩn IP67`,
        price: 11290000,
        saleoff: 22,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Redmi 7A (2GB/16GB) - Hàng Chính Hãng`,
        description: `Hàng chính hãng, Nguyên seal, Mới 100%,

        Màn hình: IPS LCD, 5.45"", HD+
        
        Camera Sau: 13 MP
        
        Camera Trước: 5 MP
        
        CPU: Qualcomm Snapdragon 439 8 nhân 64-bit
        
        Bộ Nhớ: 16GB
        
        RAM: 2GB
        
        Hỗ trợ thẻ nhớ: microSD, lên đến 512 GB
        
        Tính năng: Mở khóa bằng khuôn mặt`,
        price: 1789999,
        saleoff: 8,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Nokia 3.1 (16GB/2GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%

        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối
        
        Màn hình: IPS LCD, 5.2 inch, HD+ (720 x 1440 Pixels)
        
        Camera Trước/Sau: 8MP / 13MP
        
        CPU: MediaTek MT6750N 8 nhân
        
        ROM: 16GB
        
        RAM: 2GB`,
        price: 1690000,
        saleoff: 48,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Nokia 2.2 (16GB/2GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%

        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối
        
        Màn hình: IPS LCD, 5.71", HD+
        
        Camera Trước/Sau: 8MP/ 13MP
        
        CPU: Mediatek MT6761 4 nhân
        
        Bộ Nhớ: 16GB
        
        RAM: 2GB
        
        SIM tương thích: 2 Nano SIM, Hỗ trợ 4G
        
        Tính năng: Màn hình luôn hiển thị AOD, Đèn pin, Chặn cuộc gọi, Chặn tin nhắn`,
        price: 1690000,
        saleoff: 44,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 11 Pro 64GB - Hàng Chính Hãng`,
        description: `Nguyên seal, mới 100%, chưa active, Hàng chính hãng

        Mã Part: VN/A
        
        Màn hình: 5.8 inchs, 1125 x 2436 Pixels
        
        Camera trước: 12 MP
        
        Camera sau: Bộ 3 camera 12MP
        
        RAM: 4GB
        
        Bộ nhớ trong: 64 GB
        
        CPU: Apple A13 Bionic (7 nm+)
        
        GPU: Apple GPU 4 nhân
        
        Dung lượng pin: 3190 mAh
        
        Hệ điều hành: iOS 13
        
        SIM: 1 Nano SIM, 1 eSIM
        
        Chống nước: IP68`,
        price: 28940000,
        saleoff: 8,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy Note 10 Plus (256GB/12GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%

        Công nghệ màn hình: Super AMOLED
        
        Độ phân giải: 2K+ (1440 x 3040 Pixels)
        
        Màn hình rộng: 6.8 inch
        
        Mặt kính cảm ứng: Corning Gorilla Glass 6
        
        Camera Sau: 12.0 MP + 16.0 MP + 12.0 MP + VGA
        
        Camera Trước: 10MP
        
        CPU: Exynos 9825 8 nhân 64-bit
        
        Bộ Nhớ: 256 GB
        
        RAM: 12 GB
        
        Hỗ trợ thẻ nhớ: MicroSD, hỗ trợ tối đa 1TB
        
        Bảo mật nâng cao: Mở khóa bằng khuôn mặt, Quét mống mắt, Mở khoá vân tay dưới màn hình`,
        price: 20150000,
        saleoff: 25,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 11 Pro Max 64GB - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%, Chưa active

        Mã part: VN/A
        
        Thiết kế: Nguyên khối
        
        Màn hình: OLED (Super Retina XDR), 6.5 inch, 2688 x 1242 pixels
        
        Camera Trước/Sau: 12MP / 12MP + 12MP + 12MP
        
        CPU: Apple A13 Bionic (7 nm+)
        
        Bộ Nhớ: 64 GB
        
        RAM: 4GB
        
        SIM: 1 Nano SIM + 1 esim
        
        Tính năng: Chống nước, chống bụi, Face ID, Sạc pin nhanh`,
        price: 30940000,
        saleoff: 8,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại OPPO A5s - Hàng Chính Hãng`,
        description: `Chính hãng, nguyên seal, mới 100%

        Màn hình 6.2 inches, HD+
        
        Camera trước: 8MP
        
        Camera sau: Chính 13 MP & Phụ 2 MP
        
        CPU: MediaTek Helio P35 8 nhân 64-bit
        
        RAM: 3GB
        
        Bộ nhớ trong: 32GB
        
        Thẻ nhớ ngoài MicroSD hỗ trợ lên tới 256 GB
        
        Dung lượng Pin: 4230 mAh
        
        Thẻ SIM: 2 Nano SIM
        
        Tính năng: Bảo mật vân tay, nhận diện khuôn mặt
        
        Sản phẩm có hỗ trợ Tiếng Việt`,
        price: 2990000,
        saleoff: 25,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Nokia 3.1 (16GB/2GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%

        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối
        
        Màn hình: IPS LCD, 5.2 inch, HD+ (720 x 1440 Pixels)
        
        Camera Trước/Sau: 8MP / 13MP
        
        CPU: MediaTek MT6750N 8 nhân
        
        ROM: 16GB
        
        RAM: 2GB`,
        price: 1690000,
        saleoff: 14,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Nokia 2.2 (16GB/2GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%

        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối
        
        Màn hình: IPS LCD, 5.71", HD+
        
        Camera Trước/Sau: 8MP/ 13MP
        
        CPU: Mediatek MT6761 4 nhân
        
        Bộ Nhớ: 16GB
        
        RAM: 2GB
        
        SIM tương thích: 2 Nano SIM, Hỗ trợ 4G
        
        Tính năng: Màn hình luôn hiển thị AOD, Đèn pin, Chặn cuộc gọi, Chặn tin nhắn`,
        price: 196000,
        saleoff: 11,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 11 Pro 64GB - Hàng Chính Hãng`,
        description: `Nguyên seal, mới 100%, chưa active, Hàng chính hãng

        Mã Part: VN/A
        
        Màn hình: 5.8 inchs, 1125 x 2436 Pixels
        
        Camera trước: 12 MP
        
        Camera sau: Bộ 3 camera 12MP
        
        RAM: 4GB
        
        Bộ nhớ trong: 64 GB
        
        CPU: Apple A13 Bionic (7 nm+)
        
        GPU: Apple GPU 4 nhân
        
        Dung lượng pin: 3190 mAh
        
        Hệ điều hành: iOS 13
        
        SIM: 1 Nano SIM, 1 eSIM
        
        Chống nước: IP68`,
        price: 28490000,
        saleoff: 8,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy Note 10 Plus (256GB/12GB) - Hàng Chính Hãng`,
        description: `Chính hãng, Nguyên seal, Mới 100%

        Công nghệ màn hình: Super AMOLED
        
        Độ phân giải: 2K+ (1440 x 3040 Pixels)
        
        Màn hình rộng: 6.8 inch
        
        Mặt kính cảm ứng: Corning Gorilla Glass 6
        
        Camera Sau: 12.0 MP + 16.0 MP + 12.0 MP + VGA
        
        Camera Trước: 10MP
        
        CPU: Exynos 9825 8 nhân 64-bit
        
        Bộ Nhớ: 256 GB
        
        RAM: 12 GB
        
        Hỗ trợ thẻ nhớ: MicroSD, hỗ trợ tối đa 1TB
        
        Bảo mật nâng cao: Mở khóa bằng khuôn mặt, Quét mống mắt, Mở khoá vân tay dưới màn hình`,
        price: 20150000,
        saleoff: 2,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone 6s 32GB - Nhập Khẩu Chính Hãng`,
        description: `Mã Quốc Tế: LL,ZP, J/A,...

        Nguyên seal, mới 100%, chưa Active
        
        Miễn phí giao hàng toàn quốc
        
        Thiết kế: Nguyên khối, mặt kính cong 2.5D
        
        Màn hình: 4.7 inch, HD (1334 x 750 Pixels)
        
        Camera Trước/Sau: 5MP/ 12MP
        
        CPU: Apple A9 2 nhân 64-bit
        
        Bộ nhớ: 32GB
        
        RAM: 2GB
        
        Tính năng: Mở khóa bằng vân tay`,
        price: 6490000,
        saleoff: 19,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Vsmart Star - Hàng chính hãng`,
        description: `Chính hãng, nguyên seal, mới 100%

        Miễn phí giao hàng toàn quốc
        
        Màn hình: IPS LCD, 5.7", HD+
        
        Hệ điều hành: Android 9.0 (Pie)
        
        Camera sau: Chính 8 MP & Phụ 2 MP
        
        Camera trước: 5 MP
        
        CPU: Qualcomm Snapdragon 215 4 nhân
        
        RAM: 2 GB
        
        Bộ nhớ trong: 16 GB
        
        Thẻ nhớ: MicroSD, hỗ trợ tối đa 256 GB
        
        Thẻ SIM: 2 Nano SIM, Hỗ trợ 4G
        
        Dung lượng pin: 3000 mAh`,
        price: 1480000,
        saleoff: 16,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Xiaomi Redmi 7A (2GB/32GB) - Hàng Chính Hãng`,
        description: `Hàng chính hãng, Nguyên seal, Mới 100%,

        Màn hình: IPS LCD, 5.45"", HD+
        
        Camera Sau: 13 MP
        
        Camera Trước: 5 MP
        
        CPU: Qualcomm Snapdragon 439 8 nhân 64-bit
        
        Bộ Nhớ: 32GB
        
        RAM: 2GB
        
        Hỗ trợ thẻ nhớ: microSD, lên đến 512 GB
        
        Tính năng: Mở khóa bằng khuôn mặt`,
        price: 1990000,
        saleoff: 49,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy A70 (128GB/6GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%

        Sản phẩm đã được kích hoạt bảo hành điện tử qua tổng đài 6060 của Samsung
        
        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế: Nguyên khối, Màn hình Infinity-U
        
        Màn hình: Super AMOLED 6.7 inch Full HD+ (1080 x 2220 Pixels)
        
        Camera Sau : 32 MP + 8 MP + 5 MP.
        
        Camera Trước: 32MP
        
        CPU: Snapdragon 675 8 nhân 64-bit
        
        Bộ Nhớ: 128GB
        
        RAM: 6GB
        
        Thẻ nhớ tối đa tới: 512GB
        
        Tính năng: Cảm biến vân tay dưới màn hình, Nhận Diện Khuôn Mặt, Thư Mục Bảo Mật, Trợ lý ảo Bixby`,
        price: 6890000,
        saleoff: 40,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `BÓNG ĐÈN LED XOAY 7 MÀU`,
        description: `Thông tin sản phẩm: - Tên sản phẩm: Đèn led xoay 7 màu. - Màu sắc: nhiều màu - Kích thước hộp: 8 x8 x16cm - Chất liệu: nhựa - Đèn LED pha lê với sự pha trộn giữa 3 màu: xanh dương, xanh lá, đỏ - Sử dụng nguồn điện 220V - Chế độ xoay tròn 360 độ Điểm nổi bật - Đèn led cầu xoay 7 màu được thiết kế thông minh với nhiều màu sắc rực rỡ, quay vòng 360 độ giúp ánh sáng lan tỏa đều, mang đến cho bạn một không gian sống động, cuồng nhiệt và tràn ngập sắc màu. - Màu đa sắc rực rỡ của đèn do sự phối màu từ 3 bóng LED siêu sáng: xanh dương, xanh lá và đỏ kết hợp với ánh sáng phản chiếu qua các tấm gương cấu trúc pha lê tạo ra được nhiều hiệu ứng độc đáo. - Đèn được làm từ chất liệu cao cấp cùng những chip điện tử thông minh, bền hơn, sáng hơn và đặc biệt tiết kiệm điện hơn những loại thông thường khác. - Chuôi bóng được thiết kế với dạng ốc vặn giống chuôi đèn compact rất tiện sử dụng và lắp đặt. Sản phẩm thích hợp sử dụng ở nhiều nơi khác nhau như: quán bar, phòng trà, phòng karaoke và đặt biệt là ngay tại ngôi nhà của bạn.`,
        price: 53000,
        saleoff: 18,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone X VN/A - Hàng Chính Hãng VN/A`,
        description: `Chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Thiết kế: Nguyên khối
        
        Màn hình: Super AMOLED capacitive touchscreen, 5.8 inch HD
        
        Camera Trước/Sau: 7MP/ 2 camera 12MP
        
        CPU: Apple A11 Bionic 6 nhân
        
        Bộ Nhớ: Tùy chọn 64GB / 256GB
        
        RAM: 3GB
        
        SIM: 1 Nano SIM
        
        Tính năng: Chống nước, chống bụi, Face ID`,
        price: 1990000,
        saleoff: 23,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại OPPO F9 (A11) (64GB/4GB) - Hàng Chính Hãng`,
        description: `Thông tin dự kiến của sản phẩm:

        Sản phẩm Chính hãng, Mới 100%, Nguyên seal, Chưa Active
        
        Miễn phí giao hàng toàn quốc
        
        Màn hình: 6.3 inch (Màn hình giọt nước), FHD+ 2340 x 1080 pixels
        
        Camera Trước: 25 MP (Hỗ trợ công nghệ A.I) F2.0
        
        Camera Sau: 16 MP + 2 MP (Camera kép) F1.85
        
        CPU: Helio P60 8 nhân + 2 nhân AI, 2.0GHz
        
        Bộ Nhớ: 64GB
        
        RAM: 4GB
        
        Tính năng: Sạc nhanh siêu tốc với VOOC`,
        price: 4490000,
        saleoff: 37,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy S10 Plus (128GB/8GB) - Hàng Chính Hãng`,
        description: `Sản phẩm Chính hãng, Mới 100%, Nguyên seal

        Sản phẩm đã được kích hoạt bảo hành điện tử qua tổng đài 6060 của Samsung
        
        Miễn phí giao hàng tiêu chuẩn toàn quốc
        
        Thiết kế: Nguyên khối, màn hình vô cực
        
        Màn hình: Super AMOLED, 6.44"", Quad HD+ (2K+)
        
        Camera Sau: 3 camera (Tele 12MP (2PD) f2.4 + góc rộng 12MP f1.5/2.4 + siêu rộng 16MP f2.2 123 độ)
        
        Camera Trước: Camera kép (10MP (2PD) f1.9, Depth Camera 8MP f2.2)
        
        CPU: Lõi 8, Exynos 9820
        
        Bộ Nhớ: 128GB
        
        RAM: 8GB
        
        Tính năng: Chống nước, chống bụi, Mở khóa bằng khuôn mặt, Quét mống mắt, Mở khoá vân tay dưới màn hình, Quét vân tay siêu âm, Powershare`,
        price: 15480000,
        saleoff: 43,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại iPhone XS Max 64GB - Hàng Chính Hãng`,
        description: `Chính hãng, nguyên seal, mới 100%, chưa Active

        Miễn phí giao hàng toàn quốc
        
        Màn hình OLED 6.5 inch
        
        Camera kép 12MP, camera trước 7MP xóa phông
        
        Chip xử lý: A12 Bionic 64-bit 7nm
        
        RAM: 4GB
        
        ROM: 64GB
        
        Cảm biến nhận diện khuôn mặt Face ID
        
        Bảo vệ bằng AI ngay trên máy
        
        Màn hình viền siêu mỏng, khung thép không rỉ
        
        Chống nước IP68
        
        1 Nano SIM + 1 eSIM
        
        Hệ điều hành: iOS 12 chính thức
        
        Sạc không dây Qi`,
        price: 24900000,
        saleoff: 12,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy Note 10 (256GB/8GB) - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Mới 100%, Đã kích hoạt bảo hành điện tử

        Công nghệ màn hình: Dynamic AMOLED
        
        Màn hình rộng: 6.3 inch
        
        Độ phân giải: Full HD+ (1080 x 2280 Pixels)
        
        Mặt kính cảm ứng: Corning Gorilla Glass 6
        
        Camera Sau: 12.0 MP + 16.0 MP + 12.0 MP
        
        Camera Trước: 10.0 MP
        
        CPU: Exynos 9825 8 nhân 64-bit
        
        Bộ Nhớ: 256GB
        
        RAM: 8GB
        
        Bảo mật nâng cao Mở khóa bằng khuôn mặt, Quét mống mắt, Mở khoá vân tay dưới màn hình`,
        price: 15900000,
        saleoff: 31,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện Thoại Samsung Galaxy S10 Plus - Hàng Chính Hãng`,
        description: `Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active

        Thiết kế: Nguyên khối, màn hình vô cực
        
        Màn hình: Super AMOLED, 6.44"", Quad HD+ (2K+)
        
        Camera Sau: 3 camera (Tele 12MP (2PD) f2.4 + góc rộng 12MP f1.5/2.4 + siêu rộng 16MP f2.2 123 độ)
        
        Camera Trước: Camera kép (10MP (2PD) f1.9, Depth Camera 8MP f2.2)
        
        CPU: Exynos 9820
        
        Bộ Nhớ: 128GB / 512GB
        
        RAM: 8GB
        
        Tính năng: Chống nước, chống bụi, Mở khóa bằng khuôn mặt, Quét mống mắt, Mở khoá vân tay dưới màn hình, Quét vân tay siêu âm, Powershare`,
        price: 16750000,
        saleoff: 19,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },
    {
        name: `Điện thoại Vivo Y11 - Hàng chính hãng`,
        description: `Hàng chính hãng, nguyên seal, mới 100%

        Màn hình: IPS LCD, 6.35", HD+
        
        Hệ điều hành: Android 9.0 (Pie)
        
        Camera sau: Chính 13 MP & Phụ 2 MP
        
        Camera trước: 8 MP
        
        CPU: Qualcomm Snapdragon 439 8 nhân 64-bit
        
        RAM: 3 GB
        
        Bộ nhớ trong: 32 GB
        
        Thẻ nhớ: MicroSD, hỗ trợ tối đa 256 GB
        
        Thẻ SIM: 2 Nano SIM, Hỗ trợ 4G
        
        Dung lượng pin: 5000 mAh`,
        price: 2519000,
        saleoff: 15,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Trần Quân",
                email: "quantran@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ]
    },







    {
        name: `Điện Thoại Realme 3 (4GB/64GB)`,
        description: `Màn hình: IPS LCD HD+ 6.22"
        Camera sau kép: Chính 13 MP & Phụ 2 MP
        Camera trước: 13 MP
        Hệ điều hành Android 9.0 (Pie)
        Chipset (hãng SX CPU) MediaTek Helio P60 8 nhân
        RAM 4 GB - ROM 64 GB
        SIM 2 Nano SIM
        Jack tai nghe 3.5 mm
        Dung lượng pin 4230 mAh
        Bảo mật nâng cao Mở khóa bằng vân tay, Mở khoá khuôn mặt`,
        price: 3550000,
        saleoff: 33,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ],
        url:
            "https://www.lazada.vn/products/bao-hanh-12-thang-dien-thoai-realme-3-4gb64gb-camera-sau-kep-13mp2mp-camera-truoc-13mp-pin-4230mah-2-sim-nano-hang-chinh-hang-i396298503-s679254168.html?spm=a2o4n.searchlist.list.1.32934ac3sgkuQR&search=1"
    },
    {
        name: `Điện Thoại Samsung Galaxy M30 64GB (4GB) `,
        description: `Điện thoại Samsung Galaxy M30 bán độc quyền tại Lazada
        Màn hình tràn viền Infinity U 6.4 Inch Full HD sAmoled chiếm đến 92% thân máy
        Giao diện One UI thông minh mang đến trải nghiệm hoàn hảo hơn bao giờ hết
        Bộ 3 camera sau 13Mp - 5MP và 5MP góc chụp Siêu Rộng với tính năng Tự Động Nhận Diện và Lấy Nét bắt trọn mọi sắc nét
        Pin 5.000 mAh cùng tính năng Sạc nhanh mang đến trải nghiệm liền mạch không gián đoạn
        Vi Vi xử lý 8 nhân (2 x 1.8 GHz & 6 x 1.6 GHz) mang đến tốc độ xử lý vượt trội, thách thức mọi thể loại game
        Ram đến 4GB không còn phải chờ đợi, mọi ứng dụng sẽ được xử lý nhanh chóng hơn
        Bộ nhớ trong 64GB tha hồ lưu trữ nhạc, hình, video, cài đặt ứng dụng mà không lo hết dung lượng
        Xem đánh giá chi tiết từ Vinh Vật Vờ:https://www.youtube.com/watch?v=i3uYukCMZ_4
        Xem đánh giá chi tiết từ Tony Phùng:https://www.youtube.com/watch?v=Prep66lZbfA`,
        price: 3290000,
        saleoff: 4,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ],
        url:
            "https://www.lazada.vn/products/dien-thoai-samsung-galaxy-m30-64gb-4gb-man-hinh-tran-vien-vo-cuc-64-super-amoled-full-hd-cum-3-camera-sau-sieu-pin-5000-mah-2-nano-sim-hang-phan-phoi-chinh-hang-i296824193-s474280615.html?spm=a2o4n.searchlist.list.5.32934ac3sgkuQR&search=1"
    },
    {
        name: `Điện thoại Wiko Jerry 4 - Hàng Chính Hãng`,
        description: `Màn hình : 5.9 inches, 720 x 1440 Pixels

        Camera trước : 5 MP
        
        Camera sau : 8.0 MP, f2.0
        
        RAM : 1 GB
        
        Bộ nhớ trong : 16 GB
        
        CPU : MediaTek MT6580, Quad-Core, Quad-core 1.3 GHz, Cortex-A7
        
        GPU : Mali T820 MP1
        
        Dung lượng pin : 3730 mAh
        
        Hệ điều hành : Android 9.0 (Pie)
        
        Thẻ SIM : Micro Sim, 2 Sim`,
        price: 1490000,
        saleoff: 17,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ],
        url:
            "https://tiki.vn/dien-thoai-realme-c2-2gb-32gb-hang-chinh-hang-p40335864.html?src=search&2hi=0&keyword=%C4%91i%E1%BB%87n+tho%E1%BA%A1i"
    },
    {
        name: `Điện Thoại Oppo A1K 2GB/32GB - Hàng Chính Hãng`,
        description: `Thông số kĩ thuật:
        Hàng chính hãng nguyên seal, mới 100%
        Màn hình IPS, 6.1", HD+
        CPU: MediaTek MT6762R 8 nhân
        RAM: 2GB
        ROM: 32GB
        Camera sau: 8MP
        Camera trước: 5MP
        Dung lượng pin: 4000mAh, công nghệ sạc nhanh
        Thẻ SIM: 2 Nano SIM
        Mở khóa bằng nhận diện khuôn mặt`,
        price: 3190000,
        saleoff: 7,
        images: [],
        videos: [],
        rates: [
            {
                fullname: "Hồng Hưng",
                email: "honghung@gmail.com",
                content: "Sản phẩm chất lượng, dùng tốt. Thank shop!",
                stars: 3 + Math.floor(Math.random() * 2)
            },
            {
                fullname: "Huỳnh Trung",
                email: "trunghuynh@gmail.com",
                content: "Sản phẩm giá cả phù hợp túi tiền",
                stars: 3 + Math.floor(Math.random() * 2)
            }
        ],
        url:
            "https://shopee.vn/%C4%90i%E1%BB%87n-Tho%E1%BA%A1i-Oppo-A1K-2GB-32GB-H%C3%A0ng-Ch%C3%ADnh-H%C3%A3ng-i.25452983.2327017097"
    }
];

function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str.toLowerCase();
}

module.exports.createDefaultCollection = async () => {
    const productsArray = await ProductDao.find();
    if (productsArray.length <= 0) {
        console.log("Product collection is empty.");

        const productCategory = await ProductCategoryDao.findOneByName(
            "Điện thoại"
        );
        // console.log(productCategory);

        if (productCategory != null) {
            for (let i = 0; i < products.length; i++) {

                let key = i % products.length;

                const nameRemoveAccents = removeAccents(products[key].name);

                let productNew = new Product({
                    productCategory: productCategory,
                    name: products[key].name,
                    nameRemoveAccents: nameRemoveAccents,
                    description: products[key].description,
                    price: products[key].price,
                    saleoff: products[key].saleoff,
                    rates: products[key].rates,
                    url: products[key].url ? products[key].url : "",
                    producerCode: Math.random().toString(36).substr(2, Math.floor(Math.random() * 4) + 4).toUpperCase()
                });

                productNew.images.push(imageUrls[i % 30]);
                productNew.images.push(imageUrls[(i + 1) % 30]);
                productNew.images.push(imageUrls[(i + 2) % 30]);
                productNew.images.push(imageUrls[(i + 3) % 30]);
                productNew.images.push(imageUrls[(i + 4) % 30]);
                productNew.images.push(imageUrls[(i + 6) % 30]);

                // console.log(productNew);
                const productSave = await ProductDao.save(productNew);
                // console.log("product index: ", i, ": ", (productSave != null) ? "OK" : "Fail" );
            }
            console.log("Default Product collection created.");
        }
    } else {
        console.log(
            "Product collection existed: ",
            productsArray.length,
            "/",
            products.length
        );
    }
};
