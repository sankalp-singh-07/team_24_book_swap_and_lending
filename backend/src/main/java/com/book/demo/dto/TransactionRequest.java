package com.book.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransactionRequest {
    @NotNull
    private Long bookId;

    @NotNull
    private Long requesterId;

    private LocalDateTime dueDate;
    private String message;
}
