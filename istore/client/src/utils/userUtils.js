export default function getFullname(user){
    if(user){
        return (user.fullname.firstname +" "+ user.fullname.lastname);
    }
}