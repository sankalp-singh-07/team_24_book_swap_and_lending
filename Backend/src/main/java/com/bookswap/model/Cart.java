package com.bookswap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "carts")
public class Cart {

    @Id
    private String id;

    private String user; // Reference to User ID

    private List<CartItem> items = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    public static class CartItem {
        private String id;
        private String book;   // Reference to Book ID
        private String type;   // "buy" or "rent"
        private Double price;
        private Integer quantity = 1;
    }
}
