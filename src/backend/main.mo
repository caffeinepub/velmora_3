import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  type Product = {
    id : Nat;
    name : Text;
    price : Nat;
    category : Category;
    description : Text;
    imageUrl : Text;
    badge : ?Badge;
    createdAt : Int;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };

    public func compareByTime(product1 : Product, product2 : Product) : Order.Order {
      Int.compare(product2.createdAt, product1.createdAt);
    };

    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.price, product2.price);
    };
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Category = {
    #women;
    #men;
    #newIn;
  };

  type Badge = {
    #hot;
    #new;
    #sale;
  };

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Text, [CartItem]>();
  let wishlists = Map.empty<Principal, [Nat]>();

  var nextProductId = 1;

  public shared ({ caller }) func seedProducts() : async () {
    let sampleProducts : [Product] = [
      {
        id = nextProductId;
        name = "Elegant Women's Dress";
        price = 12999;
        category = #women;
        description = "A sophisticated dress for special occasions.";
        imageUrl = "https://images.unsplash.com/photo-1";
        badge = ?#new;
        createdAt = 1708364211000000000;
      },
      {
        id = 2;
        name = "Men's Classic Watch";
        price = 8999;
        category = #men;
        description = "Timeless style meets modern design in this classic watch.";
        imageUrl = "https://images.unsplash.com/photo-2";
        badge = ?#sale;
        createdAt = 1708364111000000000;
      },
      {
        id = 3;
        name = "Exclusive Handbag";
        price = 15999;
        category = #women;
        description = "Carry luxury with you daily.";
        imageUrl = "https://images.unsplash.com/photo-3";
        badge = ?#hot;
        createdAt = 1708364011000000000;
      },
      {
        id = 4;
        name = "Men's Leather Shoes";
        price = 10999;
        category = #men;
        description = "Premium quality leather for every occasion.";
        imageUrl = "https://images.unsplash.com/photo-4";
        badge = null;
        createdAt = 1708363911000000000;
      },
      {
        id = 5;
        name = "Women's Designer Shoes";
        price = 13999;
        category = #women;
        description = "Step into style with our exclusive designer range.";
        imageUrl = "https://images.unsplash.com/photo-5";
        badge = ?#sale;
        createdAt = 1708363811000000000;
      },
      {
        id = 6;
        name = "Men's Luxury Suit";
        price = 25999;
        category = #men;
        description = "Perfect fit, unmatched elegance.";
        imageUrl = "https://images.unsplash.com/photo-6";
        badge = ?#hot;
        createdAt = 1708363711000000000;
      },
      {
        id = 7;
        name = "Women's Silk Scarf";
        price = 3999;
        category = #women;
        description = "Add a touch of class to any outfit.";
        imageUrl = "https://images.unsplash.com/photo-7";
        badge = ?#new;
        createdAt = 1708363611000000000;
      },
      {
        id = 8;
        name = "Men's Sports Jacket";
        price = 11999;
        category = #men;
        description = "Stay stylish and warm this season.";
        imageUrl = "https://images.unsplash.com/photo-8";
        badge = null;
        createdAt = 1708363511000000000;
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
      nextProductId += 1;
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category }).sort();
  };

  public query ({ caller }) func getProductById(productId : Nat) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func createCart(cartId : Text) : async () {
    if (carts.containsKey(cartId)) { Runtime.trap("Cart already exists") };
    carts.add(cartId, []);
  };

  public shared ({ caller }) func addItemToCart(cartId : Text, productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    let currentCart = switch (carts.get(cartId)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?items) { items };
    };

    let existingItem = currentCart.find(func(item) { item.productId == productId });

    let updatedCart = switch (existingItem) {
      case (null) {
        currentCart.concat([{
          productId;
          quantity;
        }]);
      };
      case (?item) {
        currentCart.map(
          func(i) {
            if (i.productId == productId) {
              {
                productId = i.productId;
                quantity = i.quantity + quantity;
              };
            } else { i };
          }
        );
      };
    };
    carts.add(cartId, updatedCart);
  };

  public query ({ caller }) func getCartItems(cartId : Text) : async [CartItem] {
    switch (carts.get(cartId)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?items) { items };
    };
  };

  public shared ({ caller }) func removeItemFromCart(cartId : Text, productId : Nat) : async () {
    let currentCart = switch (carts.get(cartId)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?items) { items };
    };
    let updatedCart = currentCart.filter(func(item) { item.productId != productId });
    carts.add(cartId, updatedCart);
  };

  public shared ({ caller }) func clearCart(cartId : Text) : async () {
    if (not carts.containsKey(cartId)) { Runtime.trap("Cart not found") };
    carts.add(cartId, []);
  };

  public shared ({ caller }) func addToWishlist(productId : Nat) : async () {
    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?products) { products };
    };

    if (currentWishlist.find(func(id) { id == productId }) != null) {
      Runtime.trap("Product already in wishlist");
    };

    let updatedWishlist = currentWishlist.concat([productId]);
    wishlists.add(caller, updatedWishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Nat) : async () {
    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { Runtime.trap("No wishlist found") };
      case (?products) { products };
    };

    let updatedWishlist = currentWishlist.filter(func(id) { id != productId });
    wishlists.add(caller, updatedWishlist);
  };

  public query ({ caller }) func getWishlist() : async [Nat] {
    switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?products) { products };
    };
  };

  public shared ({ caller }) func clearWishlist() : async () {
    wishlists.remove(caller);
  };
};
