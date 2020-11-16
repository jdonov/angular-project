package com.winery.model.service;

import java.time.LocalDateTime;
import java.util.List;

public class CommentServiceDTO extends BaseServiceModel{
    private String comment;
    private String wineryId;
    private String username;
    private List<CommentReplyServiceDTO> replies;
    private LocalDateTime commentDateTime;

    public CommentServiceDTO() {
    }

    public CommentServiceDTO(String comment, String wineryId, String username) {
        this.comment = comment;
        this.wineryId = wineryId;
        this.username = username;
    }

    public String getComment() {
        return this.comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getWineryId() {
        return wineryId;
    }

    public void setWineryId(String wineryId) {
        this.wineryId = wineryId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<CommentReplyServiceDTO> getReplies() {
        return replies;
    }

    public void setReplies(List<CommentReplyServiceDTO> replies) {
        this.replies = replies;
    }

    public LocalDateTime getCommentDateTime() {
        return commentDateTime;
    }

    public void setCommentDateTime(LocalDateTime commentDateTime) {
        this.commentDateTime = commentDateTime;
    }
}
