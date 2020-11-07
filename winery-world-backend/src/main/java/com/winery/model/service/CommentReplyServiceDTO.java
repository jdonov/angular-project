package com.winery.model.service;

import java.time.LocalDateTime;

public class CommentReplyServiceDTO extends BaseServiceModel{
    private String comment;
    private String parentId;
    private String username;
    private LocalDateTime commentDateTime;

    public CommentReplyServiceDTO() {
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCommentDateTime() {
        return commentDateTime;
    }

    public void setCommentDateTime(LocalDateTime commentDateTime) {
        this.commentDateTime = commentDateTime;
    }
}
