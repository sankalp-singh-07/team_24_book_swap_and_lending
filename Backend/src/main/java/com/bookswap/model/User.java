package com.bookswap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullname;

    @Indexed(unique = true)
    private String email;

    private String password;

    private String address;

    @Indexed(unique = true)
    private String number;

    private String role = "user"; // "user", "admin", "organization"

    private List<Order> orders = new ArrayList<>();

    // Embedded Order document
    @Data
    @NoArgsConstructor
    public static class Order {
        private String id;
        private List<OrderItem> items = new ArrayList<>();
        private Double totalAmount;
        private String paymentMode;
        private String address;
        private LocalDateTime createdAt = LocalDateTime.now();
    }

    // Embedded OrderItem document
    @Data
    @NoArgsConstructor
    public static class OrderItem {
        private String bookId;
        private String bookName;
        private Integer quantity;
        private String type; // "buy" or "rent"
    }
}
