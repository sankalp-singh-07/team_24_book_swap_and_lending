package com.book.demo.dto;

import com.book.demo.model.Book;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String description;
    private String genre;
    private String condition;
    private Book.ListingType listingType;
    private Book.BookStatus status;
    private String imageUrl;
    private Long ownerId;
    private String ownerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
