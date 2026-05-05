package com.bookswap.controller;

import com.bookswap.dto.CartDto;
import com.bookswap.model.Book;
import com.bookswap.model.Cart;
import com.bookswap.repository.BookRepository;
import com.bookswap.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private BookRepository bookRepository;

    // POST /cart/add
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartDto.AddToCartRequest req) {
        try {
            Cart cart = cartRepository.findByUser(req.getUserId())
                    .orElseGet(() -> {
                        Cart c = new Cart();
                        c.setUser(req.getUserId());
                        return c;
                    });

            // Check if same book + same type already in cart
            Optional<Cart.CartItem> existing = cart.getItems().stream()
                    .filter(i -> i.getBook().equals(req.getBookId()) && i.getType().equals(req.getType()))
                    .findFirst();

            if (existing.isPresent()) {
                existing.get().setQuantity(existing.get().getQuantity() + 1);
            } else {
                Cart.CartItem item = new Cart.CartItem();
                item.setId(UUID.randomUUID().toString());
                item.setBook(req.getBookId());
                item.setType(req.getType());
                item.setPrice(req.getPrice());
                item.setQuantity(1);
                cart.getItems().add(item);
            }

            cartRepository.save(cart);
            return ResponseEntity.ok(Map.of("message", "Book added to cart successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error adding book to cart.", "error", e.getMessage()));
        }
    }

    // GET /cart/:Id
    @GetMapping("/{Id}")
    public ResponseEntity<?> getCart(@PathVariable String Id) {
        try {
            Optional<Cart> cartOpt = cartRepository.findByUser(Id);
            if (cartOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Cart not found"));
            }

            Cart cart = cartOpt.get();

            // Populate book details (equivalent to Mongoose .populate('items.book'))
            List<Map<String, Object>> populatedItems = new ArrayList<>();
            for (Cart.CartItem item : cart.getItems()) {
                Map<String, Object> itemMap = new LinkedHashMap<>();
                itemMap.put("_id", item.getId());
                itemMap.put("type", item.getType());
                itemMap.put("price", item.getPrice());
                itemMap.put("quantity", item.getQuantity());

                bookRepository.findById(item.getBook()).ifPresentOrElse(
                    book -> itemMap.put("book", book),
                    () -> itemMap.put("book", item.getBook())
                );
                populatedItems.add(itemMap);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("_id", cart.getId());
            response.put("user", cart.getUser());
            response.put("items", populatedItems);
            response.put("createdAt", cart.getCreatedAt());
            response.put("updatedAt", cart.getUpdatedAt());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching cart data."));
        }
    }

    // DELETE /cart/remove/:userId/:itemId
    @DeleteMapping("/remove/{userId}/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable String userId,
                                             @PathVariable String itemId) {
        try {
            Optional<Cart> cartOpt = cartRepository.findByUser(userId);
            if (cartOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Cart not found"));
            }
            Cart cart = cartOpt.get();
            cart.getItems().removeIf(item -> item.getId().equals(itemId));
            cartRepository.save(cart);
            return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error removing item", "error", e.getMessage()));
        }
    }

    // PUT /cart/update/:userId/:itemId
    @PutMapping("/update/{userId}/{itemId}")
    public ResponseEntity<?> updateQuantity(@PathVariable String userId,
                                             @PathVariable String itemId,
                                             @RequestBody CartDto.UpdateQuantityRequest req) {
        try {
            Optional<Cart> cartOpt = cartRepository.findByUser(userId);
            if (cartOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Cart not found"));
            }
            Cart cart = cartOpt.get();
            cart.getItems().stream()
                    .filter(i -> i.getId().equals(itemId))
                    .findFirst()
                    .ifPresent(i -> i.setQuantity(req.getQuantity()));
            cartRepository.save(cart);
            return ResponseEntity.ok(Map.of("message", "Item quantity updated"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error updating quantity", "error", e.getMessage()));
        }
    }

    // DELETE /cart/clear/:id
    @DeleteMapping("/clear/{id}")
    public ResponseEntity<?> clearCart(@PathVariable String id) {
        try {
            Optional<Cart> cartOpt = cartRepository.findByUser(id);
            if (cartOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Cart not found"));
            }
            Cart cart = cartOpt.get();
            cart.setItems(new ArrayList<>());
            Cart saved = cartRepository.save(cart);
            return ResponseEntity.ok(Map.of(
                "message", "Cart cleared successfully",
                "cart", saved
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }
}
