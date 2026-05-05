package com.book.demo.dto;

import com.book.demo.model.Book;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String author;

    private String isbn;
    private String description;
    private String genre;
    private String condition;

    @NotNull
    private Book.ListingType listingType;

    private String imageUrl;

    @NotNull
    private Long ownerId;
}
