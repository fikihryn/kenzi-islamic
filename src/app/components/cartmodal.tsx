// Updated CartModal component with WhatsApp checkout integration

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Product = {
  id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  foto?: string;
};

type CartItem = {
  id: number;
  akun_id: number;
  produk_id: number;
  jumlah: number;
  product?: Product;
};

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product; // Optional product to add when opening from product detail
  initialQuantity?: number; // Optional initial quantity when adding from product detail
}

export default function CartModal({
  isOpen,
  onClose,
  product,
  initialQuantity = 1,
}: CartModalProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [addingToCart, setAddingToCart] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [addMessage, setAddMessage] = useState({ type: "", text: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  // WhatsApp number constant
  const WHATSAPP_NUMBER = "+6285794345930";

  // Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth");
        if (response.ok) {
          const userData = await response.json();
          if (userData?.user) {
            setUser(userData.user);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  // Fetch cart items when modal opens
  useEffect(() => {
    if (isOpen && user) {
      fetchCartItems();
    }
  }, [isOpen, user]);

  // Calculate total price whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product?.harga || 0) * item.jumlah;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [product, initialQuantity]);

  // Fetch cart items from the API
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart data");
      
      const data = await response.json();
      console.log("Cart API response:", data);
      
      // Try to find items array in the response - common API patterns
      let items: CartItem[] = [];
      
      if (Array.isArray(data)) {
        // If data is already an array
        items = data;
      } else if (typeof data === 'object' && data !== null) {
        // If data is an object, look for common field names that might contain the items array
        const possibleItemsFields = ['items', 'cartItems', 'data', 'results', 'content'];
        
        for (const field of possibleItemsFields) {
          if (Array.isArray(data[field])) {
            items = data[field];
            console.log(`Found cart items in the '${field}' property`);
            break;
          }
        }
        
        // If we still don't have an array, check if the object itself is a single cart item
        if (items.length === 0 && 'id' in data && 'produk_id' in data) {
          items = [data as CartItem];
        }
      }
      
      if (items.length === 0) {
        console.log("Response structure:", Object.keys(data));
      }
      
      // Ensure each cart item has product information
      // This is a critical step to make sure we have the product data needed for images
      const itemsWithProducts = await Promise.all(items.map(async (item) => {
        // If item already has product info, use it
        if (item.product?.id === item.produk_id && item.product.foto) {
          return item;
        }
        
        // Otherwise fetch product details
        try {
          const productResponse = await fetch(`/api/products/${item.produk_id}`);
          if (productResponse.ok) {
            const productData = await productResponse.json();
            // Find the product object in the response
            let productInfo = null;
            if (productData.product) {
              productInfo = productData.product;
            } else if (productData.data) {
              productInfo = productData.data;
            } else if (productData.id && productData.nama_produk) {
              productInfo = productData;
            }
            
            if (productInfo) {
              console.log(`Found product info for ID ${item.produk_id}:`, productInfo);
              return { ...item, product: productInfo };
            }
          }
        } catch (err) {
          console.error(`Failed to fetch product ${item.produk_id} details:`, err);
        }
        return item;
      }));
      
      setCartItems(itemsWithProducts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Could not load your cart items.");
      setLoading(false);
      setCartItems([]);
    }
  };

  // Add product to cart
  const addToCart = async () => {
    if (!user) {
      setAddMessage({ type: "error", text: "Please login to add items to cart" });
      return;
    }

    if (!product) {
      setAddMessage({ type: "error", text: "Product information missing" });
      return;
    }

    setAddingToCart(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produk_id: product.id,
          jumlah: quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", errorData || response.statusText);
        throw new Error(`Failed to add item to cart: ${response.status} ${response.statusText}`);
      }

      // Refresh cart items
      await fetchCartItems();
      setAddMessage({ type: "success", text: "Item added to cart successfully" });
      
      // Reset quantity after adding
      setQuantity(1);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setAddMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to add item to cart" });
    } finally {
      setAddingToCart(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setAddMessage({ type: "", text: "" });
      }, 3000);
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch(`/api/cartitem/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jumlah: newQuantity }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Update quantity error response:", errorData || response.statusText);
        throw new Error(`Failed to update quantity: ${response.status} ${response.statusText}`);
      }
      
      // Update local state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === cartItemId ? { ...item, jumlah: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err instanceof Error ? err.message : "Failed to update quantity.");
    }
  };

  // Remove item from cart
  const removeCartItem = async (cartItemId: number) => {
    setRemovingItemId(cartItemId);
    setError(""); // Clear previous errors
    
    try {
      console.log(`Removing cart item ID: ${cartItemId}`);
      
      const response = await fetch(`/api/cartitem/${cartItemId}`, {
        method: "DELETE",
      });
      
      console.log(`Delete response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Delete error response:", errorData || response.statusText);
        throw new Error(`Failed to remove item: ${response.status} ${response.statusText}`);
      }
      
      // Try to parse response if available
      const responseData = await response.json().catch(() => null);
      console.log("Delete response data:", responseData);
      
      // Update local state by removing the item
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
      
      // Show success message
      setAddMessage({ type: "success", text: "Item removed successfully" });
      setTimeout(() => setAddMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err instanceof Error ? err.message : "Failed to remove item from cart.");
    } finally {
      setRemovingItemId(null);
    }
  };

  // FIXED: Improved image source handling with better path resolution
  const getImageSrc = (img: string | undefined) => {
    if (!img) {
      console.log("No image provided, using default");
      return "/default-image.jpg";
    }
    
    // Log the original image path for debugging
    console.log("Processing image path:", img);
    
    // If image already has a complete URL, use it as is
    if (img.startsWith("http://") || img.startsWith("https://")) {
      console.log("Using absolute URL:", img);
      return img;
    }
    
    // If image path contains "uploads" already, don't add it again
    if (img.includes("uploads/")) {
      console.log("Path already contains uploads directory:", img);
      return img.startsWith("/") ? img : `/${img}`;
    }
    
    // Otherwise, add the uploads prefix with proper leading slash
    const result = `/uploads/${img}`;
    console.log("Using processed path:", result);
    return result;
  };

  // Generate WhatsApp message based on cart items
  const generateWhatsAppMessage = () => {
    // Start the message
    let message = "berikut pesanan saya :\n\n";
    
    // Add each item with its details
    cartItems.forEach(item => {
      const productName = item.product?.nama_produk || `Product #${item.produk_id}`;
      const price = item.product?.harga || 0;
      const quantity = item.jumlah;
      const itemTotal = price * quantity;
      
      message += `${productName} x${quantity}: Rp ${itemTotal.toLocaleString("id-ID")}\n`;
    });
    
    // Add total price
    message += `\ndan total harga: Rp ${totalPrice.toLocaleString("id-ID")}`;
    
    return encodeURIComponent(message);
  };

  // Handle checkout process
  const handleCheckout = () => {
    setProcessingCheckout(true);
    
    try {
      // Generate WhatsApp URL with pre-filled message
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      setAddMessage({ type: "success", text: "Order sent to WhatsApp!" });
      
      // Optional: Clear cart after checkout
      // This is commented out since you might want to keep the cart until the order is confirmed
      // setCartItems([]);
    } catch (err) {
      console.error("Error during checkout:", err);
      setAddMessage({ 
        type: "error", 
        text: err instanceof Error ? err.message : "Failed to process checkout" 
      });
    } finally {
      setProcessingCheckout(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setAddMessage({ type: "", text: "" });
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b dark:border-neutral-700">
              <h2 className="text-xl font-medium dark:text-white">
                {product ? 'Add to Cart' : 'Your Cart'}
              </h2>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!user ? (
                <div className="text-center py-10">
                  <p className="mb-5 dark:text-white">Please login to view your cart</p>
                  <Link href="/login" className="bg-amber-100 text-amber-800 px-5 py-2.5 rounded-md hover:bg-amber-200 transition-colors font-medium">
                    Login
                  </Link>
                </div>
              ) : loading ? (
                <div className="text-center py-10 dark:text-white">
                  <p>Loading cart items...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">
                  <p>{error}</p>
                  <button 
                    onClick={() => fetchCartItems()} 
                    className="mt-5 px-5 py-2.5 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors font-medium"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  {/* Add to cart section (when product is provided) */}
                  {product && (
                    <div className="mb-8 pb-6 border-b dark:border-neutral-700">
                      <div className="flex items-center gap-5">
                        <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden relative">
                          {/* Loading indicator */}
                          <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                            <svg className="animate-spin h-5 w-5 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <img
                            src={getImageSrc(product.foto)}
                            alt={product.nama_produk}
                            className="w-full h-full object-cover relative z-10"
                            onLoad={(e) => {
                              // Remove loading indicator when image loads
                              const parent = (e.target as HTMLElement).parentElement;
                              if (parent) {
                                const loadingIndicator = parent.querySelector('div');
                                if (loadingIndicator) loadingIndicator.style.display = 'none';
                              }
                            }}
                            onError={(e) => {
                              console.warn(`Product image failed to load: ${product.foto}`);
                              (e.target as HTMLImageElement).src = "/default-image.jpg";
                              // Remove loading indicator
                              const parent = (e.target as HTMLElement).parentElement;
                              if (parent) {
                                const loadingIndicator = parent.querySelector('div');
                                if (loadingIndicator) loadingIndicator.style.display = 'none';
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg dark:text-white">{product.nama_produk}</h3>
                          <p className="text-amber-700">Rp {product.harga.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                      
                      <div className="mt-5 flex items-center">
                        <div className="flex items-center border border-neutral-200 rounded-md overflow-hidden dark:border-neutral-700">
                          <button
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 font-medium dark:text-white">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={addToCart}
                          disabled={addingToCart}
                          className="ml-4 flex-1 bg-amber-100 text-amber-800 py-2.5 px-5 rounded-md hover:bg-amber-200 transition-colors font-medium disabled:opacity-50"
                        >
                          {addingToCart ? "Adding..." : "Add to Cart"}
                        </button>
                      </div>
                      
                      {addMessage.text && (
                        <div className={`mt-4 p-3 rounded-md ${
                          addMessage.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}>
                          {addMessage.text}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Cart items */}
                  <div>
                    <h3 className="font-medium text-lg mb-5 dark:text-white">Cart Items</h3>
                    
                    {cartItems.length === 0 ? (
                      <p className="text-center py-8 text-neutral-500">Your cart is empty</p>
                    ) : (
                      <div className="space-y-5">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 py-4 border-b dark:border-neutral-700">
                            <div className="w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden relative">
                              {/* Loading indicator */}
                              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                                <svg className="animate-spin h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                              <img
                                src={getImageSrc(item.product?.foto)}
                                alt={item.product?.nama_produk || "Product"}
                                className="w-full h-full object-cover relative z-10"
                                data-product-id={item.produk_id}
                                data-original-src={item.product?.foto || "no-image"}
                                onLoad={(e) => {
                                  // Remove loading indicator when image loads
                                  const parent = (e.target as HTMLElement).parentElement;
                                  if (parent) {
                                    const loadingIndicator = parent.querySelector('div');
                                    if (loadingIndicator) loadingIndicator.style.display = 'none';
                                  }
                                }}
                                onError={(e) => {
                                  console.warn(`Item image failed to load for product ${item.produk_id}: ${item.product?.foto}`);
                                  (e.target as HTMLImageElement).src = "/default-image.jpg";
                                  // Remove loading indicator
                                  const parent = (e.target as HTMLElement).parentElement;
                                  if (parent) {
                                    const loadingIndicator = parent.querySelector('div');
                                    if (loadingIndicator) loadingIndicator.style.display = 'none';
                                  }
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium dark:text-white">
                                {item.product?.nama_produk || "Product"}
                              </h4>
                              <p className="text-amber-700 text-sm">
                                Rp {(item.product?.harga || 0).toLocaleString("id-ID")}
                              </p>
                              
                              <div className="flex items-center mt-3">
                                <div className="flex items-center border border-neutral-200 rounded-md overflow-hidden text-sm dark:border-neutral-700">
                                  <button
                                    onClick={() => updateCartItemQuantity(item.id, item.jumlah - 1)}
                                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="px-3 py-1 font-medium dark:text-white">{item.jumlah}</span>
                                  <button
                                    onClick={() => updateCartItemQuantity(item.id, item.jumlah + 1)}
                                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                                
                                <button
                                  onClick={() => removeCartItem(item.id)}
                                  disabled={removingItemId === item.id}
                                  className="ml-auto text-neutral-500 hover:text-neutral-700 disabled:opacity-50 transition-colors"
                                >
                                  {removingItemId === item.id ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            
            {/* Footer with total and checkout */}
            {user && cartItems.length > 0 && (
              <div className="border-t dark:border-neutral-700 p-6">
                <div className="flex justify-between mb-5">
                  <span className="font-medium text-lg dark:text-white">Total</span>
                  <span className="font-semibold text-lg text-amber-700">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                
                {/* Display message if any */}
                {addMessage.text && (
                  <div className={`mb-4 p-3 rounded-md ${
                    addMessage.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}>
                    {addMessage.text}
                  </div>
                )}
                
                <button 
                  onClick={handleCheckout}
                  disabled={processingCheckout || cartItems.length === 0}
                  className="w-full bg-amber-100 text-amber-800 py-3.5 rounded-md hover:bg-amber-200 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processingCheckout ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Proceed to WhatsApp Checkout
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}