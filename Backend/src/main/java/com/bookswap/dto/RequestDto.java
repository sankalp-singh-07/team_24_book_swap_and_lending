package com.bookswap.dto;

import lombok.Data;

public class RequestDto {

    @Data
    public static class CreateRequest {
        private String bookId;
        private String requesterId;
        private String requestType;
        private String offeredBookId;
        private String message;
    }

    @Data
    public static class UpdateStatusRequest {
        private String status;
    }
}
