package com.bookswap.dto;

import lombok.Data;

public class CartDto {

    @Data
    public static class AddToCartRequest {
        private String userId;
        private String bookId;
        private String type;
        private Double price;
    }

    @Data
    public static class UpdateQuantityRequest {
        private Integer quantity;
    }
}
