package com.bookswap.controller;

import com.bookswap.dto.UserDto;
import com.bookswap.model.User;
import com.bookswap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // POST /user/signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto.SignupRequest req) {
        try {
            if (userRepository.existsByEmail(req.getEmail())) {
                return ResponseEntity.status(400).body(Map.of("message", "User already exists"));
            }
            User user = new User();
            user.setFullname(req.getFullname());
            user.setEmail(req.getEmail());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setAddress(req.getAddress());
            user.setNumber(req.getNumber());
            user.setRole("user");
            User saved = userRepository.save(user);
            return ResponseEntity.status(201).body(Map.of(
                "message", "User created successfully",
                "user", buildUserResponse(saved)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }

    // POST /user/signup/organization
    @PostMapping("/signup/organization")
    public ResponseEntity<?> organizationSignup(@RequestBody UserDto.SignupRequest req) {
        try {
            if (userRepository.existsByEmail(req.getEmail())) {
                return ResponseEntity.status(400).body(Map.of("message", "User already exists"));
            }
            User user = new User();
            user.setFullname(req.getFullname());
            user.setEmail(req.getEmail());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setAddress(req.getAddress());
            user.setNumber(req.getNumber());
            user.setRole("organization");
            User saved = userRepository.save(user);
            return ResponseEntity.status(201).body(Map.of(
                "message", "Organization created successfully",
                "user", buildUserResponse(saved)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }

    // POST /user/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto.LoginRequest req) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
            if (userOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), userOpt.get().getPassword())) {
                return ResponseEntity.status(400).body(Map.of("message", "Invalid username or password"));
            }
            User user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "user", buildUserResponse(user)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }

    // GET /user/:id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable String id) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "User not found"));
            }
            return ResponseEntity.ok(Map.of(
                "message", "User profile fetched successfully",
                "user", buildUserResponse(userOpt.get())
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }

    // PUT /user/:id
    @PutMapping("/{id}")
    public ResponseEntity<?> editUserProfile(@PathVariable String id,
                                              @RequestBody UserDto.UpdateProfileRequest req) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "User not found"));
            }
            User user = userOpt.get();
            if (req.getFullname() != null) user.setFullname(req.getFullname());
            if (req.getEmail() != null) user.setEmail(req.getEmail());
            if (req.getAddress() != null) user.setAddress(req.getAddress());
            if (req.getNumber() != null) user.setNumber(req.getNumber());
            User saved = userRepository.save(user);
            return ResponseEntity.ok(Map.of(
                "message", "User profile updated successfully",
                "user", buildUserResponse(saved)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }

    // PUT /user/:id/orders
    @PutMapping("/{id}/orders")
    public ResponseEntity<?> addOrder(@PathVariable String id,
                                       @RequestBody UserDto.AddOrderRequest req) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "User not found"));
            }
            User user = userOpt.get();

            // Map DTO to embedded Order
            User.Order order = new User.Order();
            order.setId(UUID.randomUUID().toString());
            order.setTotalAmount(req.getOrder().getTotalAmount());
            order.setPaymentMode(req.getOrder().getPaymentMode());
            order.setAddress(req.getOrder().getAddress());

            if (req.getOrder().getItems() != null) {
                req.getOrder().getItems().forEach(itemDto -> {
                    User.OrderItem item = new User.OrderItem();
                    item.setBookId(itemDto.getBookId());
                    item.setBookName(itemDto.getBookName());
                    item.setQuantity(itemDto.getQuantity());
                    item.setType(itemDto.getType());
                    order.getItems().add(item);
                });
            }

            user.getOrders().add(order);
            User saved = userRepository.save(user);
            return ResponseEntity.ok(Map.of(
                "message", "Order added successfully",
                "orders", saved.getOrders()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error"));
        }
    }

    // GET /user/:id/orders
    @GetMapping("/{id}/orders")
    public ResponseEntity<?> getUserOrders(@PathVariable String id) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty() || userOpt.get().getOrders().isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "No orders found for this user."));
            }
            return ResponseEntity.ok(userOpt.get().getOrders());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching orders"));
        }
    }

    // Helper: build user response map
    private Map<String, Object> buildUserResponse(User user) {
        return Map.of(
            "_id", user.getId(),
            "fullname", user.getFullname(),
            "email", user.getEmail(),
            "address", user.getAddress() != null ? user.getAddress() : "",
            "number", user.getNumber() != null ? user.getNumber() : "",
            "role", user.getRole() != null ? user.getRole() : "user"
        );
    }
}
