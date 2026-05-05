package com.bookswap.repository;

import com.bookswap.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByUser(String userId);
    List<Book> findByNameRegexIgnoreCase(String nameRegex);

    @Query("{ '$and': ["
            + "{ '$or': ["
            + "{ 'name': { '$regex': ?0, '$options': 'i' } },"
            + "{ 'author': { '$regex': ?0, '$options': 'i' } },"
            + "{ 'genre': { '$regex': ?0, '$options': 'i' } },"
            + "{ 'category': { '$regex': ?0, '$options': 'i' } }"
            + "] },"
            + "{ '$or': [ { 'location': { '$regex': ?1, '$options': 'i' } }, { '$expr': { '$eq': [ ?1, '' ] } } ] },"
            + "{ '$or': [ { 'availabilityType': ?2 }, { '$expr': { '$eq': [ ?2, '' ] } } ] }"
            + "] }")
    List<Book> searchCatalog(String query, String location, String availabilityType);
}
