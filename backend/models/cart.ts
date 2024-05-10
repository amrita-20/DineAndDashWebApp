import User from "../schemas/User";

async function getCartFromUser(userId: string) {
    try {
        const userData = await User.findOne({ _id: userId });
        return userData?.cart || null;
    } catch(err) {
        console.log(err);
    }
}

async function addToCart(userId: string, addedItems: object) {

}


async function removeFromCart(userId: string, dishId: string) {

}


function calculateTotal() {

}

function () {

}