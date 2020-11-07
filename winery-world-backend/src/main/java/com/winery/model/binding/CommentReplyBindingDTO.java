package com.winery.model.binding;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CommentReplyBindingDTO {
    private String parentId;
    private CommentBindingDTO reply;

    public CommentReplyBindingDTO() {
    }

    @NotEmpty(message = "Reply should refer to existing comment!")
    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    @NotNull(message = "Reply can not be null!")
    public CommentBindingDTO getReply() {
        return reply;
    }

    public void setReply(CommentBindingDTO reply) {
        this.reply = reply;
    }
}
