package com.bookswap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "books")
public class Book {

    @Id
    private String id;

    private String name;
    private Double price;
    private String category;
    private String image;
    private String title;
    private String user; // Reference to User ID
    private String author;
    private String genre;
    private String location;
    private String availabilityType = "lend"; // "lend", "swap", or "donate"
    private String status = "available"; // "available", "requested", "lent", "swapped", "returned"
    private String condition;
    private String description;
}
