const router = require("express").Router();
const CartOrder = require("../model/Cart");

//http://localhost:8070/cart/add
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const item = req.body.item;
  const productImage = req.body.productImage;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const district = req.body.district;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const address = req.body.address;
  const expireDate = req.body.expireDate;

  const newCartOrder = new CartOrder({
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    mobile,
    email,
    address,
    expireDate,
  });

  newCartOrder
    .save()
    .then(() => {
      res.json("New Seller cartOrder added succesfully!");
    })
    .catch((error) => {
      console.log(error);
    });
});

//http://localhost:8070/cart/
router.route("/").get((req, res) => {
  cartOrder
    .find()
    .then((cartorders) => {
      res.json(cartorders);
    })
    .catch((error) => {
      console.log(error);
    });
});

//http://localhost:8070/cart/update/id
router.route("/update/:id").put(async (req, res) => {
  let CartOrderID = req.params.id;
  const {
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    company,
    mobile,
    land,
    email,
    address,
    expireDate,
  } = req.body;
  const updateCartOrder = {
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    company,
    mobile,
    land,
    email,
    address,
    expireDate,
  };

  await cartOrder
    .findByIdAndUpdate(CartOrderID, updateCartOrder)
    .then(() => {
      res.status(200).send({ status: "seller updated" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by either seller or admin
//http://localhost:8070/cart/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  let CartOrderID = req.params.id;

  await cartOrder
    .findByIdAndDelete(CartOrderID)
    .then(() => {
      res.status(200).send({ status: "seller deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by admin
//http://localhost:8070/cart/get/id
router.route("/get/:id").get(async (req, res) => {
  let CartOrderID = req.params.id;
  await cartOrder
    .findById(CartOrderID)
    .then((sellercartOrder) => {
      res.status(200).send({ status: "user fetched", cartOrder });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "error with ferching student" });
    });
});

module.exports = router;
