var md5 = require('md5');

const User = require('../../models/user.model');
const UserDao = require('../../dao/user.dao');
const Authorization = require('../../models/authorization.model');
const AuthorizationDao = require('../../dao/authorization.dao');

// console.log(md5("123456")); //e10adc3949ba59abbe56e057f20f883e

const users = [
    {
        authorizationName: 'Admin',
        fullname: { firstname: 'Lan', lastname: 'Nguyễn' },
        phone: '0123456789',
        email: 'admin1@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Admin',
        fullname: { firstname: 'Huyền', lastname: 'Trần' },
        phone: '0123456790',
        email: 'admin2@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Admin',
        fullname: { firstname: 'Thảo', lastname: 'Cao' },
        phone: '0123456791',
        email: 'admin3@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Admin',
        fullname: { firstname: 'Ngọc', lastname: 'Lê' },
        phone: '0123456792',
        email: 'admin4@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Admin',
        fullname: { firstname: 'Mai', lastname: 'Mai' },
        phone: '0123456793',
        email: 'admin5@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Employee',
        fullname: { firstname: 'Phú', lastname: 'Hồ' },
        phone: '0123456794',
        email: 'employee1@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Employee',
        fullname: { firstname: 'Tuấn', lastname: 'Lê' },
        phone: '0123456795',
        email: 'employee2@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Employee',
        fullname: { firstname: 'Thủy', lastname: 'Cao' },
        phone: '0123456796',
        email: 'employee3@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Employee',
        fullname: { firstname: 'Ngân', lastname: 'Phạm' },
        phone: '0123456797',
        email: 'employee4@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'Employee',
        fullname: { firstname: 'Hưng', lastname: 'Nguyễn' },
        phone: '0123456798',
        email: 'employee5@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Nhung', lastname: 'Bùi' },
        phone: '0123456799',
        email: 'user1@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Nga', lastname: 'Phạm' },
        phone: '0123456800',
        email: 'user2@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Duyên', lastname: 'Nguyễn' },
        phone: '0123456801',
        email: 'user3@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Uyên', lastname: 'Trịnh' },
        phone: '0123456802',
        email: 'user4@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Mạnh', lastname: 'Lê' },
        phone: '0123456803',
        email: 'user5@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Bảo', lastname: 'Trương' },
        phone: '0123456804',
        email: 'user6@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Chính', lastname: 'Cao' },
        phone: '0123456805',
        email: 'user7@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Hoa', lastname: 'Nguyễn' },
        phone: '0123456806',
        email: 'user8@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Nhi', lastname: 'Nguyễn' },
        phone: '0123456807',
        email: 'user9@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    },
    {
        authorizationName: 'User',
        fullname: { firstname: 'Toàn', lastname: 'Trịnh' },
        phone: '0123456808',
        email: 'user10@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        address: 'Thủ Đức, Hồ Chí Minh',
        isEmailActivated: true,
        gender: false,
        avatars: ['https://img.icons8.com/bubbles/2x/user.png']
    }
];

module.exports.createDefaultCollection = async () => {
    const usersArray = await UserDao.find();
    if (usersArray.length <= 0) {
        console.log('User collection is empty.');

        const authorizations = await AuthorizationDao.find();
        if (authorizations.length > 0) {
            authorizations.map(authorization => {
                users.map(user => {
                    if (
                        user.authorizationName.localeCompare(
                            authorization.name
                        ) == 0
                    ) {
                        const userNew = new User({
                            authorization: authorization,
                            fullname: user.fullname,
                            phone: user.phone,
                            email: user.email,
                            isEmailActivated: true,
                            password: user.password,
                            address: user.address,
                            gender: user.gender,
                            birthday: user.birthday,
                            timeRegister: user.timeRegister,
                            avatars: user.avatars
                        });

                        // console.log(userNew);
                        UserDao.save(userNew);
                    }
                });
            });
            console.log('Default User collection created.');
        }
    } else {
        console.log('User collection existed: ', usersArray.length, '/20');
    }
};
