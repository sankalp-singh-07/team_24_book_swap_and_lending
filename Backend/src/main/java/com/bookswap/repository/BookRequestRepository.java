package com.bookswap.repository;

import com.bookswap.model.BookRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRequestRepository extends MongoRepository<BookRequest, String> {
    List<BookRequest> findByRequesterId(String requesterId);
    List<BookRequest> findByOwnerId(String ownerId);
}
