package com.winery.repository;

import com.winery.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findAllByWineryIdAndParentIdOrderByCommentDateTimeDesc(String wineryId, String parentId);
}
