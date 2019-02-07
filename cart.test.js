const cart = require('./cart');
const data = require('./data/cars')

describe("Cart Properties: ", () => {
    test("Check to see if the cart is an empty array", () => {
        expect( Array.isArray(cart.cart) && cart.cart.length === 0).toEqual(true)
    })
    test("The total property should equal zero", () => {
        expect( cart.total === 0 ).toEqual(true);
    })
})

describe("Cart Methods: ", () => {
    afterEach(() => {
        cart.cart = [];
        cart.total = 0
    })
    test("addCart should add an object to the end of the cart array", () => {
        cart.addToCart(data[3]);
        expect( cart.cart.length ).toEqual(1);
        expect( cart.cart[0] === data[3]);
    })
    test("addCart should increase total by the price of the car added", () => {
        cart.addToCart(data[4]);
        expect(cart.total).toEqual(data[4].price)
    })
    test("removeFromCart should maintain the order of car objects once one is removed", () => {
        cart.addToCart(data[1]);
        cart.addToCart(data[2]);
        cart.addToCart(data[3]);
        cart.removeFromCart(1, data[2].price);
        expect( cart.cart.length ).toEqual(2);
        expect( cart.cart[0] ).toEqual(data[1]);
        expect( cart.cart[1] ).toEqual(data[3]);
    })
    test("removeFromCart should decrement the total by the given parameter", () => {
        cart.addToCart(data[1]);
        cart.addToCart(data[2])
        cart.removeFromCart(1, data[2].price);

        expect(cart.total).toEqual(data[1].price);
    })
    test("checkout should reset total and cart", () => {
        cart.checkout();

        expect(cart.cart.length === 0).toEqual(true);
        expect(cart.total === 0).toEqual(true);
    })
})