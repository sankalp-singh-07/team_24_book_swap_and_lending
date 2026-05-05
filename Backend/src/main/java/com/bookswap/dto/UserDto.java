package com.bookswap.dto;

import lombok.Data;
import java.util.List;

// ─── User DTOs ──────────────────────────────────────────────────────────────

public class UserDto {

    @Data
    public static class SignupRequest {
        private String fullname;
        private String email;
        private String password;
        private String address;
        private String number;
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class UpdateProfileRequest {
        private String fullname;
        private String email;
        private String address;
        private String number;
    }

    @Data
    public static class AddOrderRequest {
        private OrderDto order;
    }

    @Data
    public static class OrderDto {
        private List<OrderItemDto> items;
        private Double totalAmount;
        private String paymentMode;
        private String address;
    }

    @Data
    public static class OrderItemDto {
        private String bookId;
        private String bookName;
        private Integer quantity;
        private String type;
    }

    @Data
    public static class UserResponse {
        private String id;
        private String fullname;
        private String email;
        private String address;
        private String number;
        private String role;
    }
}
