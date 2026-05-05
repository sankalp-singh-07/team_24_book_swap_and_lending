package com.bookswap.dto;

import lombok.Data;

public class BookDto {

    @Data
    public static class AddBookRequest {
        private String name;
        private Double price;
        private String category;
        private String image;
        private String title;
        private String userId;
        private String author;
        private String genre;
        private String location;
        private String availabilityType;
        private String condition;
        private String description;
    }
}
